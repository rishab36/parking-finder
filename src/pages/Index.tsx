import React, { useState, useEffect } from "react";
import ParkingMap from "@/components/ParkingMap";
import ParkingInfo from "@/components/ParkingInfo";
import LocationError from "@/components/LocationError";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { useParking } from "@/hooks/useParking";
import { useLocationPermission } from "@/hooks/useLocationPermission";
import FavoritesList from "@/components/FavoritesList";
import { ParkingStatistics } from "@/components/ParkingStatistics";
import OfflineNotice from "@/components/OfflineNotice";
import NoteInput from "@/components/NoteInput";
import ParkingAvailability from "@/components/ParkingAvailability";
import WeatherInfo from "@/components/WeatherInfo";
import TopNavigation from "@/components/TopNavigation";
import BottomNavigation from "@/components/BottomNavigation";
import WelcomeTutorial from "@/components/WelcomeTutorial";
import MainSidebar from "@/components/MainSidebar";
import ParkingToggle from "@/components/ParkingToggle";
import { toast } from "@/hooks/use-toast";
import "../lib/animations.css";
import GasStationInfo from "@/components/GasStationInfo";
import AnalyticsInsights from "@/components/AnalyticsInsights";

interface GasStation {
  id: string;
  name: string;
  address: string;
  price: number;
  distance: number;
  latitude: number;
  longitude: number;
}

interface BusStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  routes?: string[];
}

interface BicycleRoad {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  length?: number;
}

const Index = () => {
  // Handler to close the welcome/tutorial modal
  const handleCloseTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("hasSeenTutorial", "true");
  };
  const [showTutorial, setShowTutorial] = useState(() => {
    return !localStorage.getItem("hasSeenTutorial");
  });
  const [searchedLocation, setSearchedLocation] = useState<[number, number] | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPaidParking, setShowPaidParking] = useState(false);
  const [gasStations, setGasStations] = useState<GasStation[]>([]);
  const [busStations, setBusStations] = useState<BusStation[]>([]);
  const [bicycleRoads, setBicycleRoads] = useState<BicycleRoad[]>([]);
  const [showGasStations, setShowGasStations] = useState(false);
  const [showBusStations, setShowBusStations] = useState(false);
  const [showBicycleRoads, setShowBicycleRoads] = useState(false);
  const [selectedGasStation, setSelectedGasStation] = useState<GasStation | null>(null);
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("selectedCurrency") || "USD";
  });

  const { permissionStatus, requestLocationPermission } = useLocationPermission();

  const {
    parkingLocation,
    currentLocation,
    parkingSpots,
    selectedSpot,
    isLoading,
    locationError,
    isFavorite,
    favoriteSpots,
    lastRefreshTime,
    mapClickMode,
    offlineMode,
    offlineModeEnabled,
    isAddingNote,
    noteInput,
    handleSaveLocation,
    handleResetLocation,
    handleRefreshParking,
    handleMarkerClick,
    handleToggleFavorite,
    handleGetDirections,
    handleMapClick,
    handleShareLocation,
    handleSaveNote,
    handleRestoreLocation,
    handleFindEvChargers,
    handleToggleOfflineMode,
    handleSearchLocation,
    setIsAddingNote,
    setNoteInput,
    addToFavorites,
    detectCurrentLocationCurrency,
  } = useParking();

  useEffect(() => {
    if (currentLocation) {
      detectCurrentLocationCurrency().then(detectedCurrency => {
        if (detectedCurrency !== currency) {
          setCurrency(detectedCurrency);
          localStorage.setItem("selectedCurrency", detectedCurrency);
          console.log("Currency auto-detected:", detectedCurrency);
        }
      });
    }
  }, [currentLocation]);
  // Pull-to-refresh for mobile: refresh if user pulls down at top
  useEffect(() => {
    let touchStartY = 0;
    let isPulling = false;
    const threshold = 60; // Minimum pull-down distance in px

    function onTouchStart(e) {
      // Prevent pull-to-refresh if touch starts inside the map
      const mapElem = document.querySelector('.leaflet-container, [data-map-container], .parking-map-container');
      if (mapElem && mapElem.contains(e.target)) {
        isPulling = false;
        return;
      }
      if (window.scrollY === 0) {
        touchStartY = e.touches[0].clientY;
        isPulling = true;
      }
    }
    function onTouchMove(e) {
      if (!isPulling) return;
      const touchMoveY = e.touches[0].clientY;
      if (touchMoveY - touchStartY > threshold) {
        isPulling = false;
        window.location.reload();
      }
    }
    function onTouchEnd() {
      isPulling = false;
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);
  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    localStorage.setItem("selectedCurrency", newCurrency);
  };

  const handleGasStationClick = (station: GasStation) => {
    setSelectedGasStation(selectedGasStation?.id === station.id ? null : station);
  };

  const handleLocationSearch = async (query: string) => {
    try {
      const coordinates = await handleSearchLocation(query, handleCurrencyChange);
      
      if (coordinates) {
        setSearchedLocation(coordinates);
        setShowGasStations(false);
        setShowBusStations(false);
        setShowBicycleRoads(false);
        setGasStations([]);
        setBusStations([]);
        setBicycleRoads([]);
        setSelectedGasStation(null);
        setShowPaidParking(false);
      }
    } catch (error) {
      console.error("Search error:", error);
      await handleRefreshParking();
    }
  };

  const handleNavigateHome = async () => {
    console.log("Navigating to home, checking location permission...");
    
    setSearchedLocation(null);
    setShowGasStations(false);
    setShowBusStations(false);
    setShowBicycleRoads(false);
    setGasStations([]);
    setBusStations([]);
    setBicycleRoads([]);
    setSelectedGasStation(null);
    setShowPaidParking(false);

    if (permissionStatus === 'denied') {
      toast({
        title: "Location access required",
        description: "Please enable location services to find parking near you.",
        variant: "destructive"
      });
      return;
    }

    if (permissionStatus === 'prompt' || !currentLocation) {
      console.log("Requesting location permission...");
      const location = await requestLocationPermission();
      if (location) {
        console.log("Location granted, refreshing parking...");
        await handleRefreshParking();
      }
    } else if (currentLocation) {
      console.log("Location already available, refreshing parking...");
      await handleRefreshParking();
    }
  };

  const handleParkingToggle = async (enabled: boolean) => {
    console.log("Parking toggle clicked, enabled:", enabled);
    
    if (currency === 'INR' && enabled) {
      toast({
        title: "Feature Coming Soon",
        description: "Paid parking search is coming soon for India. Currently showing free parking only.",
      });
      return;
    }
    
    setShowPaidParking(enabled);
    setShowGasStations(false);
    setShowBusStations(false);
    setShowBicycleRoads(false);
    
    try {
      console.log("Refreshing parking with paid mode:", enabled);
      await handleRefreshParking(enabled);
      
      if (enabled) {
        toast({
          title: "Searching for paid parking with accurate pricing",
          description: "Finding parking spots with verified car and bike rates"
        });
      } else {
        toast({
          title: "Searching for free parking",
          description: "Finding free parking spots in your area"
        });
      }
    } catch (error) {
      console.error("Error toggling parking type:", error);
      toast({
        title: "Failed to load parking spots",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  const handleShowGasStations = (stations: GasStation[]) => {
    setGasStations(stations);
    setShowGasStations(true);
    setShowBusStations(false);
    setShowBicycleRoads(false);
    setSidebarOpen(false);
  };

  const handleShowBusStations = (stations: BusStation[]) => {
    setBusStations(stations);
    setShowBusStations(true);
    setShowGasStations(false);
    setShowBicycleRoads(false);
    setSidebarOpen(false);
  };

  const handleShowBicycleRoads = (roads: BicycleRoad[]) => {
    setBicycleRoads(roads);
    setShowBicycleRoads(true);
    setShowGasStations(false);
    setShowBusStations(false);
    setSidebarOpen(false);
  };

  const handleGasStationDirections = (station: any) => {
    const destination = `${station.latitude.toFixed(6)},${station.longitude.toFixed(6)}`;
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
    
    toast({
      title: "Opening directions",
      description: "Google Maps will open in a new tab"
    });
  };

  const handlePinLocationFromInsight = (location: any) => {
    const favoriteSpot = {
      id: `insight-${Date.now()}`,
      name: location.address || 'Pinned Location',
      latitude: location.latitude,
      longitude: location.longitude,
      timestamp: new Date().getTime(),
    };
    
    addToFavorites(favoriteSpot);
  };

  const isShowingAnyService = showGasStations || showBusStations || showBicycleRoads;

  const handleGasStationSearch = async () => {
    if (currentLocation) {
      try {
        const { findGasStations } = await import("@/lib/parkingUtils");
        let stations = await findGasStations(currentLocation[0], currentLocation[1]);

        // If no stations found, search wider area and auto-zoom
        if (stations.length === 0) {
          console.log("No gas stations found in current area, searching wider area...");
          stations = await findGasStations(currentLocation[0], currentLocation[1]);
          
          if (stations.length > 0) {
            const nearest = stations[0];
            handleShowGasStations(stations);
            setSidebarOpen(false);
            
            toast({
              title: "Zoomed to nearest gas stations",
              description: `Found ${stations.length} stations ${nearest.distance ? Math.round(nearest.distance) + 'km' : ''} away`
            });
            return;
          }
        }

        handleShowGasStations(stations);
        setSidebarOpen(false);
        
        toast({
          title: `Found ${stations.length} gas stations nearby`,
          description: "Click on a marker to see details and prices."
        });
      } catch (error) {
        console.error("Error finding gas stations:", error);
        toast({
          title: "Error finding gas stations",
          description: "We couldn't find gas stations in your area. Please try again.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Location required",
        description: "Please enable location services to find nearby gas stations.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-800 transition-colors duration-300">
      <TopNavigation
        onSaveLocation={handleSaveLocation}
        onRefreshParking={handleRefreshParking}
        onFindEvChargers={handleFindEvChargers}
        onToggleOfflineMode={handleToggleOfflineMode}
        onSearchLocation={handleLocationSearch}
        onOpenSidebar={() => setSidebarOpen(true)}
        onNavigateHome={handleNavigateHome}
        isLoading={isLoading}
        isOffline={offlineMode}
        offlineModeEnabled={offlineModeEnabled}
      />
      
      <MainSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentLocation={currentLocation}
        onShowGasStations={handleShowGasStations}
        onShowBusStations={handleShowBusStations}
        onShowBicycleRoads={handleShowBicycleRoads}
        currency={currency}
        onCurrencyChange={handleCurrencyChange}
      />
      
      <BottomNavigation
        onFindEvChargers={handleFindEvChargers}
        onToggleOfflineMode={handleToggleOfflineMode}
        onFindGasStations={handleGasStationSearch}
        isLoading={isLoading}
        isOffline={offlineMode}
        offlineModeEnabled={offlineModeEnabled}
      />
      
      <main className="flex-1 container max-w-4xl px-3 sm:px-4 pt-4 pb-safe">
        <LocationError error={locationError} />
        
        {offlineMode && <OfflineNotice isOffline={true} />}
        
        <AnalyticsInsights onPinLocation={handlePinLocationFromInsight} />
        
        {isAddingNote && (
          <div className="animate-scale-in mb-4">
            <NoteInput 
              initialNote={noteInput}
              onSave={handleSaveNote}
              onCancel={() => setIsAddingNote(false)}
            />
          </div>
        )}
        
        {favoriteSpots.length > 0 && (
          <div className="mb-4 animate-fade-in delay-150">
            <FavoritesList 
              favorites={favoriteSpots} 
              onSelect={(spot) => handleMarkerClick({...spot, amenity: "parking", id: Number(spot.id)})} 
            />
          </div>
        )}
        
        <div className="h-[350px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 mb-4 sm:mb-6 animate-fade-in delay-200 border border-white/50 dark:border-gray-700/50 glassmorphic touch-manipulation map-container">
          <ParkingMap 
            location={parkingLocation} 
            currentLocation={currentLocation}
            parkingSpots={parkingSpots}
            gasStations={gasStations}
            busStations={busStations}
            bicycleRoads={bicycleRoads}
            selectedSpot={selectedSpot}
            selectedGasStation={selectedGasStation}
            onMarkerClick={handleMarkerClick}
            onGasStationClick={handleGasStationClick}
            onMapClick={handleMapClick}
            clickMode={mapClickMode}
            isOffline={offlineMode || offlineModeEnabled}
            searchedLocation={searchedLocation}
            showGasStations={showGasStations}
            showBusStations={showBusStations}
            showBicycleRoads={showBicycleRoads}
            currency={currency}
          />
        </div>
        
        {!isShowingAnyService && (
          <div className="mb-4 animate-fade-in delay-250">
            <ParkingToggle
              showPaidParking={showPaidParking}
              onToggle={handleParkingToggle}
              isLoading={isLoading}
              currency={currency}
            />
          </div>
        )}
        
        {isShowingAnyService && (
          <div className="mb-4 animate-fade-in delay-250">
            <button
              onClick={() => {
                setShowGasStations(false);
                setShowBusStations(false);
                setShowBicycleRoads(false);
                handleRefreshParking(showPaidParking);
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Back to Parking
            </button>
          </div>
        )}
        
        {selectedGasStation && showGasStations && (
          <div className="mb-4 animate-fade-in delay-250">
            <GasStationInfo
              selectedGasStation={selectedGasStation}
              currency={currency}
              userLocation={currentLocation}
              onGetDirections={handleGasStationDirections}
            />
          </div>
        )}
        
        <div className="animate-fade-in delay-350">
          <ParkingInfo 
            parkingSpots={parkingSpots}
            selectedSpot={selectedSpot}
            parkingLocation={parkingLocation}
            onGetDirections={handleGetDirections}
            onReset={handleResetLocation}
            onToggleFavorite={selectedSpot ? handleToggleFavorite : undefined}
            onShareLocation={handleShareLocation}
            onAddNote={() => {
              setNoteInput(parkingLocation?.note || "");
              setIsAddingNote(true);
            }}
            isFavorite={isFavorite}
            currency={currency}
            userLocation={currentLocation}
            showPaidParking={showPaidParking}
          />
        </div>
        
        {selectedSpot && !isShowingAnyService && (
          <div className="mb-4 animate-fade-in delay-400">
            <ParkingAvailability 
              spotName={selectedSpot.name}
              latitude={selectedSpot.latitude}
              longitude={selectedSpot.longitude}
            />
          </div>
        )}
        
        {(parkingSpots.length > 0 || lastRefreshTime) && !isShowingAnyService && (
          <div className="mb-4 animate-fade-in delay-450">
            <ParkingStatistics 
              spotsCount={parkingSpots.length} 
              lastRefreshTime={lastRefreshTime}
            />
          </div>
        )}
        
        {currentLocation && !offlineMode && !offlineModeEnabled && (
          <div className="mb-4 animate-fade-in delay-500">
            <WeatherInfo 
              latitude={currentLocation[0]}
              longitude={currentLocation[1]}
              className="border border-white/50 dark:border-gray-700/50 glassmorphic"
            />
          </div>
        )}
        
        <Footer />
      </main>
      
      <ThemeToggle />
      
      {showTutorial && <WelcomeTutorial onClose={handleCloseTutorial} />}
    </div>
  );
};

export default Index;

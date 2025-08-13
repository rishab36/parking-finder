import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  ParkingLocation,
  ParkingSpot,
  clearParkingLocation,
  getCurrentPosition,
  getSavedParkingLocation,
  saveParkingLocation,
  findNearbyParking,
  findPaidParking,
  getParkingHistory,
  isOnline,
  cacheMapTiles,
  syncOfflineData,
  calculateDistance,
} from "@/lib/parkingUtils";
import { useAnalytics } from "./useAnalytics";

export interface FavoriteSpot {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  timestamp: number;
}

export type MapClickMode = 'normal' | 'update' | 'addNote';

// Enhanced country detection mapping for currency with more comprehensive coverage
const locationToCurrency: { [key: string]: string } = {
  // United Kingdom - prioritize UK detection
  "uk": "GBP", "united kingdom": "GBP", "england": "GBP", "london": "GBP", "manchester": "GBP", 
  "birmingham": "GBP", "liverpool": "GBP", "leeds": "GBP", "glasgow": "GBP", "edinburgh": "GBP",
  "bristol": "GBP", "sheffield": "GBP", "cardiff": "GBP", "belfast": "GBP", "scotland": "GBP",
  "wales": "GBP", "northern ireland": "GBP",
  
  // United States
  "usa": "USD", "america": "USD", "united states": "USD", "new york": "USD", "los angeles": "USD", 
  "chicago": "USD", "houston": "USD", "phoenix": "USD", "philadelphia": "USD", "san antonio": "USD", 
  "san diego": "USD", "dallas": "USD", "san jose": "USD", "austin": "USD", "jacksonville": "USD", 
  "fort worth": "USD", "columbus": "USD", "charlotte": "USD", "san francisco": "USD", "indianapolis": "USD", 
  "seattle": "USD", "denver": "USD", "boston": "USD", "nashville": "USD", "oklahoma city": "USD",
  
  // Canada
  "canada": "CAD", "toronto": "CAD", "montreal": "CAD", "vancouver": "CAD", "calgary": "CAD", 
  "ottawa": "CAD", "edmonton": "CAD", "winnipeg": "CAD", "quebec": "CAD",
  
  // Eurozone
  "germany": "EUR", "berlin": "EUR", "munich": "EUR", "hamburg": "EUR", "cologne": "EUR", "frankfurt": "EUR",
  "france": "EUR", "paris": "EUR", "marseille": "EUR", "lyon": "EUR", "toulouse": "EUR", "nice": "EUR",
  "spain": "EUR", "madrid": "EUR", "barcelona": "EUR", "valencia": "EUR", "seville": "EUR",
  "italy": "EUR", "rome": "EUR", "milan": "EUR", "naples": "EUR", "turin": "EUR", "florence": "EUR",
  "netherlands": "EUR", "amsterdam": "EUR", "rotterdam": "EUR", "the hague": "EUR",
  "belgium": "EUR", "brussels": "EUR", "antwerp": "EUR",
  "austria": "EUR", "vienna": "EUR", "salzburg": "EUR",
  "finland": "EUR", "helsinki": "EUR",
  "ireland": "EUR", "dublin": "EUR",
  "portugal": "EUR", "lisbon": "EUR", "porto": "EUR",
  
  // Australia
  "australia": "AUD", "sydney": "AUD", "melbourne": "AUD", "perth": "AUD", "brisbane": "AUD", 
  "adelaide": "AUD", "canberra": "AUD", "darwin": "AUD",
  
  // India
  "india": "INR", "mumbai": "INR", "delhi": "INR", "bangalore": "INR", "hyderabad": "INR", 
  "chennai": "INR", "kolkata": "INR", "pune": "INR", "ahmedabad": "INR", "jaipur": "INR",
  
  // China
  "china": "CNY", "beijing": "CNY", "shanghai": "CNY", "guangzhou": "CNY", "shenzhen": "CNY", "chengdu": "CNY",
  
  // Japan
  "japan": "JPY", "tokyo": "JPY", "osaka": "JPY", "kyoto": "JPY", "yokohama": "JPY", "kobe": "JPY",
  
  // Brazil
  "brazil": "BRL", "são paulo": "BRL", "rio de janeiro": "BRL", "brasília": "BRL", "salvador": "BRL",
  
  // Mexico
  "mexico": "MXN", "mexico city": "MXN", "guadalajara": "MXN", "monterrey": "MXN", "puebla": "MXN",
  
  // Other major countries
  "russia": "RUB", "moscow": "RUB", "saint petersburg": "RUB",
  "south korea": "KRW", "seoul": "KRW", "busan": "KRW",
  "turkey": "TRY", "istanbul": "TRY", "ankara": "TRY",
  "south africa": "ZAR", "cape town": "ZAR", "johannesburg": "ZAR",
  "switzerland": "CHF", "zurich": "CHF", "geneva": "CHF",
  "sweden": "SEK", "stockholm": "SEK",
  "norway": "NOK", "oslo": "NOK",
  "denmark": "DKK", "copenhagen": "DKK",
  "poland": "PLN", "warsaw": "PLN",
  "czech republic": "CZK", "prague": "CZK",
  "hungary": "HUF", "budapest": "HUF",
  "israel": "ILS", "tel aviv": "ILS", "jerusalem": "ILS",
  "singapore": "SGD",
  "thailand": "THB", "bangkok": "THB",
  "malaysia": "MYR", "kuala lumpur": "MYR",
  "indonesia": "IDR", "jakarta": "IDR",
  "philippines": "PHP", "manila": "PHP",
  "vietnam": "VND", "ho chi minh": "VND", "hanoi": "VND",
  "new zealand": "NZD", "auckland": "NZD", "wellington": "NZD"
};

const detectCurrencyFromLocation = (locationName: string): string => {
  const normalizedLocation = locationName.toLowerCase();
  
  // Check for exact matches first, prioritizing more specific matches
  const sortedEntries = Object.entries(locationToCurrency)
    .sort(([a], [b]) => b.length - a.length); // Sort by length descending for better matching
  
  for (const [key, currency] of sortedEntries) {
    if (normalizedLocation.includes(key)) {
      return currency;
    }
  }
  
  return "USD"; // Default fallback
};

const detectCurrencyFromCoordinates = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`);
    const data = await response.json();
    
    if (data && data.address) {
      const address = data.address;
      const country = address.country || '';
      const city = address.city || address.town || address.village || '';
      const locationString = `${city} ${country}`.toLowerCase();
      
      return detectCurrencyFromLocation(locationString);
    }
  } catch (error) {
    console.error("Error detecting currency from coordinates:", error);
  }
  
  return "USD"; // Default fallback
};

export function useParking() {
  const [parkingLocation, setParkingLocation] = useState<ParkingLocation | null>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [favoriteSpots, setFavoriteSpots] = useState<FavoriteSpot[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);
  const [mapClickMode, setMapClickMode] = useState<MapClickMode>('normal');
  const [parkingHistory, setParkingHistory] = useState<ParkingLocation[]>([]);
  const [offlineMode, setOfflineMode] = useState(false);
  const [noteInput, setNoteInput] = useState<string>("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [offlineModeEnabled, setOfflineModeEnabled] = useState(false);
  
  const { trackParkingSession, trackLocationVisit } = useAnalytics();
  
  const handleGetCurrentLocation = async () => {
    setIsLoading(true);
    setLocationError(null);
    
    try {
      const position = await getCurrentPosition();
      setCurrentLocation([position.coords.latitude, position.coords.longitude]);
      
      // If online, cache map tiles for the current location
      if (isOnline()) {
        cacheMapTiles(position.coords.latitude, position.coords.longitude)
          .catch(err => console.warn("Failed to cache map tiles:", err));
      }
      
      return position;
    } catch (error) {
      console.error("Error getting location:", error);
      setLocationError("Unable to access your location. Please make sure location services are enabled.");
      toast.error("Location error", {
        description: "We couldn't access your location. Please enable location services.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleOfflineMode = () => {
    setOfflineModeEnabled(!offlineModeEnabled);
    toast.info(offlineModeEnabled ? "Online mode enabled" : "Offline mode enabled", {
      description: offlineModeEnabled ? "All features available" : "Limited features, data saved locally"
    });
  };

  const handleUpdateMode = () => {
    setMapClickMode(mapClickMode === 'update' ? 'normal' : 'update');
    if (mapClickMode !== 'update') {
      toast.info("Click on the map to update your parking spot", {
        description: "Tap where you parked on the map",
        duration: 5000,
      });
    }
  };
  
  const handleMapClick = (lat: number, lng: number) => {
    if (mapClickMode === 'update') {
      // Create a new parking location from the clicked point
      const newLocation: ParkingLocation = {
        latitude: lat,
        longitude: lng,
        timestamp: new Date().getTime(),
        note: "Parked spot"
      };
      
      // Save and update state
      saveParkingLocation(newLocation);
      setParkingLocation(newLocation);
      
      // Track analytics
      trackParkingSession(newLocation, 'free');
      
      // Add to history
      const updatedHistory = [newLocation, ...parkingHistory].slice(0, 3);
      setParkingHistory(updatedHistory);
      
      setMapClickMode('normal'); // Reset mode
      setIsAddingNote(true); // Prompt for note
      setNoteInput("Parked spot");
      
      toast.success("Parking location updated!", {
        description: "Your parking spot has been set to the location you clicked.",
      });
      
      // If online, cache map tiles for offline use
      if (isOnline()) {
        cacheMapTiles(lat, lng);
      }
    }
  };

  const handleSaveLocation = async () => {
    if (mapClickMode === 'update') {
      // In update mode, we wait for the map click
      toast.info("Click on the map to set your parking location", {
        description: "Tap exactly where you parked for better accuracy",
        duration: 5000,
      });
      return;
    }
    
    setIsLoading(true);
    setLocationError(null);
    
    try {
      const position = await getCurrentPosition();
      
      // Use high accuracy positioning for exact location
      const newLocation: ParkingLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: new Date().getTime(),
        note: "Parked spot"
      };
      
      saveParkingLocation(newLocation);
      setParkingLocation(newLocation);
      
      // Track analytics
      trackParkingSession(newLocation, 'free');
      
      // Update parking history
      const updatedHistory = [newLocation, ...parkingHistory].slice(0, 3);
      setParkingHistory(updatedHistory);
      
      // Update current location
      setCurrentLocation([position.coords.latitude, position.coords.longitude]);
      
      // Show different toast based on online status
      if (offlineMode || offlineModeEnabled) {
        toast.success("Parking location saved offline!", {
          description: "Will sync when you're back online",
        });
      } else {
        toast.success("Parking location saved!", {
          description: "Your parking spot has been saved",
        });
      }
      
      // If online, cache map tiles for offline use
      if (isOnline()) {
        cacheMapTiles(position.coords.latitude, position.coords.longitude);
      }
      
    } catch (error) {
      console.error("Error getting location:", error);
      setLocationError("Unable to access your location. Please make sure location services are enabled.");
      toast.error("Location error", {
        description: "We couldn't access your location. Please enable location services.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetLocation = () => {
    clearParkingLocation();
    setParkingLocation(null);
    setSelectedSpot(null);
    toast.info("Parking location cleared", {
      description: "Your saved parking location has been removed. You can still find it in history.",
    });
  };

  const handleRefreshParking = async (showPaidOnly = false) => {
    setIsLoading(true);
    setLocationError(null);
    setParkingSpots([]);
    setSelectedSpot(null); // Clear selected spot to avoid orange marker persistence
    
    // If offline, show a message
    if (offlineMode || offlineModeEnabled) {
      toast.warning("You're offline", {
        description: "Can't refresh parking spots while offline. Using cached data if available."
      });
      setIsLoading(false);
      return;
    }
    
    try {
      let currentPos;
      
      // Use current location if available, otherwise get new position
      if (currentLocation) {
        currentPos = { coords: { latitude: currentLocation[0], longitude: currentLocation[1] } };
      } else {
        currentPos = await handleGetCurrentLocation();
      }
      
      let spots = [];
      
      if (showPaidOnly) {
        // Fetch paid parking spots with accurate car and bike pricing
        console.log("Fetching PAID parking spots...");
        spots = await findPaidParking(currentPos.coords.latitude, currentPos.coords.longitude);
      } else {
        // Fetch FREE parking spots
        console.log("Fetching FREE parking spots...");
        spots = await findNearbyParking(currentPos.coords.latitude, currentPos.coords.longitude);
      }
      
      setParkingSpots(spots);
      setLastRefreshTime(new Date());
      
      const parkingType = showPaidOnly ? 'paid parking areas' : 'free parking areas';
      toast.success(`Found ${spots.length} ${parkingType} nearby`, {
        description: "Click on a marker to see details.",
      });
      
      // Auto-zoom to nearest parking if no results found in current view
      if (spots.length === 0) {
        console.log("No parking spots found in current area, searching wider area...");
        try {
          const widerSpots = showPaidOnly 
            ? await findPaidParking(currentPos.coords.latitude, currentPos.coords.longitude)
            : await findNearbyParking(currentPos.coords.latitude, currentPos.coords.longitude);
          
          if (widerSpots.length > 0) {
            const nearest = widerSpots[0];
            // Trigger map zoom to nearest spot
            setCurrentLocation([nearest.latitude, nearest.longitude]);
            setParkingSpots(widerSpots);
            toast.info("Zoomed to nearest parking area", {
              description: `Found parking ${nearest.distance ? Math.round(nearest.distance) + 'km' : ''} away`
            });
          }
        } catch (error) {
          console.error("Error finding wider area parking:", error);
        }
      }
      
      // Cache map tiles for offline use
      cacheMapTiles(currentPos.coords.latitude, currentPos.coords.longitude);
      
    } catch (error) {
      console.error("Error fetching parking spots:", error);
      toast.error("Error finding parking spots", {
        description: "We couldn't find parking spots in your area. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkerClick = (spot: ParkingSpot | FavoriteSpot) => {
    // Convert FavoriteSpot to ParkingSpot if needed
    const parkingSpot: ParkingSpot = 'amenity' in spot 
      ? spot as ParkingSpot 
      : {
          id: Number(spot.id),
          latitude: spot.latitude,
          longitude: spot.longitude,
          name: spot.name,
          amenity: 'parking'
        };

    // Clear previous selection first
    setSelectedSpot(null);
    
    // Then set new selection (this will trigger re-render with proper highlighting)
    setTimeout(() => {
      setSelectedSpot(parkingSpot);
    }, 50);
    
    // Check if spot is in favorites
    if (parkingSpot.id !== undefined) {
      const spotIdString = String(parkingSpot.id);
      const isFav = favoriteSpots.some(fav => fav.id === spotIdString);
      setIsFavorite(isFav);
    } else {
      setIsFavorite(false);
    }
  };

  const handleToggleFavorite = () => {
    if (!selectedSpot) return;
    
    // Ensure we have a string ID
    const spotId = selectedSpot.id !== undefined ? String(selectedSpot.id) : `spot-${Date.now()}`;
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favoriteSpots.filter(fav => fav.id !== spotId);
      setFavoriteSpots(updatedFavorites);
      localStorage.setItem("favoriteSpots", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      toast.info("Removed from favorites");
    } else {
      // Add to favorites
      const favoriteSpot: FavoriteSpot = {
        id: spotId,
        name: selectedSpot.name || `Parking Spot ${favoriteSpots.length + 1}`,
        latitude: selectedSpot.latitude,
        longitude: selectedSpot.longitude,
        timestamp: new Date().getTime(),
      };
      
      const updatedFavorites = [...favoriteSpots, favoriteSpot];
      setFavoriteSpots(updatedFavorites);
      localStorage.setItem("favoriteSpots", JSON.stringify(updatedFavorites));
      setIsFavorite(true);
      toast.success("Added to favorites");
    }
  };

  const handleGetDirections = (spot: ParkingSpot) => {
    // Fix directions by ensuring we have proper coordinates
    const destination = `${spot.latitude.toFixed(6)},${spot.longitude.toFixed(6)}`;
    
    // Use a more reliable maps URL that works on both mobile and desktop
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
    
    // Open in a new tab
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
    
    // Show a toast message for user feedback
    toast.success("Opening directions", {
      description: "Google Maps will open in a new tab"
    });
  };

  const handleShareLocation = () => {
    if (!parkingLocation) return;

    if (navigator.share) {
      navigator.share({
        title: 'My Parked Car Location',
        text: parkingLocation.note ? 
          `Find my car at: ${parkingLocation.note} (${parkingLocation.latitude}, ${parkingLocation.longitude})` :
          `Find my car at coordinates: ${parkingLocation.latitude}, ${parkingLocation.longitude}`,
        url: `https://www.google.com/maps/search/?api=1&query=${parkingLocation.latitude},${parkingLocation.longitude}`
      })
      .then(() => toast.success("Location shared successfully"))
      .catch((error) => {
        console.error("Error sharing:", error);
        toast.error("Couldn't share location");
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareUrl = `https://www.google.com/maps/search/?api=1&query=${parkingLocation.latitude},${parkingLocation.longitude}`;
      
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          toast.success("Location link copied to clipboard", {
            description: "You can now share it with your friends"
          });
        })
        .catch(() => {
          toast.error("Couldn't copy location link");
        });
    }
  };
  
  const handleSaveNote = (note: string) => {
    if (!parkingLocation) return;
    
    const updatedLocation = {
      ...parkingLocation,
      note: note
    };
    
    // Save the updated location
    saveParkingLocation(updatedLocation);
    setParkingLocation(updatedLocation);
    
    // Update in history
    const updatedHistory = parkingHistory.map(loc => 
      loc.timestamp === parkingLocation.timestamp ? updatedLocation : loc
    );
    setParkingHistory(updatedHistory);
    
    setIsAddingNote(false);
    toast.success("Note saved");
  };
  
  const handleRestoreLocation = (location: ParkingLocation) => {
    // Restore a previous parking location
    saveParkingLocation(location);
    setParkingLocation(location);
    
    // Track visit to this location
    trackLocationVisit(location);
    
    toast.success("Previous parking location restored", {
      description: location.note || "Your parking spot has been restored from history"
    });
  };

  const handleFindEvChargers = async () => {
    setIsLoading(true);
    setLocationError(null);
    setParkingSpots([]);
    setSelectedSpot(null);
    
    if (offlineMode || offlineModeEnabled) {
      toast.warning("You're offline", {
        description: "Can't search for EV chargers while offline."
      });
      setIsLoading(false);
      return;
    }
    
    try {
      let currentPos;
      
      if (currentLocation) {
        currentPos = { coords: { latitude: currentLocation[0], longitude: currentLocation[1] } };
      } else {
        currentPos = await handleGetCurrentLocation();
      }
      
      const { findEvChargers } = await import("@/lib/parkingUtils");
      const chargers = await findEvChargers(currentPos.coords.latitude, currentPos.coords.longitude);
      
      setParkingSpots(chargers);
      setLastRefreshTime(new Date());
      
      toast.success(`Found ${chargers.length} EV charging stations nearby`, {
        description: "Click on a marker to see charging details."
      });
      
      // Auto-zoom to nearest EV charger if none found in current view
      if (chargers.length === 0) {
        console.log("No EV chargers found in current area, searching wider area...");
        try {
          const widerChargers = await findEvChargers(currentPos.coords.latitude, currentPos.coords.longitude);
          
          if (widerChargers.length > 0) {
            const nearest = widerChargers[0];
            setCurrentLocation([nearest.latitude, nearest.longitude]);
            setParkingSpots(widerChargers);
            toast.info("Zoomed to nearest EV charging station", {
              description: `Found charger ${nearest.distance ? Math.round(nearest.distance) + 'km' : ''} away`
            });
          }
        } catch (error) {
          console.error("Error finding wider area EV chargers:", error);
        }
      }
      
    } catch (error) {
      console.error("Error fetching EV chargers:", error);
      toast.error("Error finding EV chargers", {
        description: "We couldn't find EV charging stations in your area. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchLocation = async (query: string, onCurrencyChange?: (currency: string) => void) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const location = data[0];
        const coordinates: [number, number] = [parseFloat(location.lat), parseFloat(location.lon)];
        
        // Auto-detect currency from location
        const detectedCurrency = detectCurrencyFromLocation(query);
        if (onCurrencyChange) {
          onCurrencyChange(detectedCurrency);
        }
        
        setCurrentLocation(coordinates);
        
        // Search for free parking spots near this location by default
        const spots = await findNearbyParking(coordinates[0], coordinates[1]);
        setParkingSpots(spots);
        setLastRefreshTime(new Date());
        
        toast.success("Location found", {
          description: `Found ${spots.length} parking areas near ${location.display_name?.split(',')[0] || query}. Currency set to ${detectedCurrency}.`
        });

        // Return the coordinates so the map can zoom to them
        return coordinates;
      } else {
        toast.error("Location not found", {
          description: "Please try a different search query"
        });
        return null;
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Search failed", {
        description: "Unable to search for that location"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const addToFavorites = (favoriteSpot: FavoriteSpot) => {
    const updatedFavorites = [...favoriteSpots, favoriteSpot];
    setFavoriteSpots(updatedFavorites);
    localStorage.setItem("favoriteSpots", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const saved = getSavedParkingLocation();
    if (saved) {
      setParkingLocation(saved);
    }
    
    // Load history
    const history = getParkingHistory();
    setParkingHistory(history);
    
    // Load favorites
    const savedFavorites = localStorage.getItem("favoriteSpots");
    if (savedFavorites) {
      try {
        setFavoriteSpots(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Error loading favorites:", e);
      }
    }
    
    // Check online status
    setOfflineMode(!isOnline());
    
    // Get current location on mount and AUTO-LOAD FREE PARKING
    handleGetCurrentLocation()
      .then(async position => {
        if (position && isOnline()) {
          console.log("Auto-loading FREE parking spots on page load...");
          findNearbyParking(position.coords.latitude, position.coords.longitude)
            .then(spots => {
              setParkingSpots(spots);
              setLastRefreshTime(new Date());
              if (spots.length > 0) {
                toast.success(`Found ${spots.length} free parking areas nearby`, {
                  description: "Click on a marker to see details."
                });
              }
            })
            .catch(error => {
              console.error("Error auto-loading parking spots:", error);
            });
        }
      })
      .catch(console.error);
    
    // Add event listeners for online/offline status
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  const handleOnlineStatusChange = () => {
    const online = isOnline();
    setOfflineMode(!online);
    
    if (online) {
      toast.success("You're back online", { 
        description: "Syncing offline data..." 
      });
      
      // Sync offline data when coming back online
      syncOfflineData().then(() => {
        toast.success("Offline data synced successfully");
      }).catch(() => {
        toast.error("Failed to sync offline data");
      });
    } else {
      toast.warning("You're offline", { 
        description: "You can still save your location locally" 
      });
    }
  };

  // Function to auto-detect currency from current location
  const detectCurrentLocationCurrency = async () => {
    if (currentLocation) {
      const currency = await detectCurrencyFromCoordinates(currentLocation[0], currentLocation[1]);
      return currency;
    }
    return "USD";
  };
  
  return {
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
    parkingHistory,
    offlineMode,
    noteInput,
    isAddingNote,
    showHistory,
    offlineModeEnabled,
    handleSaveLocation,
    handleUpdateMode,
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
    setNoteInput,
    setIsAddingNote,
    toggleHistory,
    addToFavorites,
    detectCurrentLocationCurrency
  };
}

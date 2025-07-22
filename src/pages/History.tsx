
import React, { useState } from "react";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { useParking } from "@/hooks/useParking";
import ParkingHistory from "@/components/ParkingHistory";
import TopNavigation from "@/components/TopNavigation";
import MainSidebar from "@/components/MainSidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const History = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("selectedCurrency") || "USD";
  });

  const { 
    parkingHistory, 
    handleRestoreLocation, 
    handleSaveLocation,
    handleRefreshParking,
    handleFindEvChargers,
    handleToggleOfflineMode,
    isLoading,
    offlineMode,
    offlineModeEnabled
  } = useParking();

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleNavigateHome = () => {
    // No-op for history page since we're already handling navigation with Link
    console.log('Navigate home from history page');
  };

  const handleShowGasStations = (stations: any[]) => {
    // No-op for history page since there's no map to display gas stations
    console.log('Gas stations found:', stations);
  };

  const handleShowBusStations = (stations: any[]) => {
    // No-op for history page since there's no map to display bus stations
    console.log('Bus stations found:', stations);
  };

  const handleShowBicycleRoads = (roads: any[]) => {
    // No-op for history page since there's no map to display bicycle roads
    console.log('Bicycle roads found:', roads);
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    localStorage.setItem("selectedCurrency", newCurrency);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <TopNavigation
        onSaveLocation={handleSaveLocation}
        onRefreshParking={handleRefreshParking}
        onFindEvChargers={handleFindEvChargers}
        onToggleOfflineMode={handleToggleOfflineMode}
        onOpenSidebar={handleOpenSidebar}
        onNavigateHome={handleNavigateHome}
        isLoading={isLoading}
        isOffline={offlineMode}
        offlineModeEnabled={offlineModeEnabled}
      />
      
      <MainSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        currentLocation={null}
        onShowGasStations={handleShowGasStations}
        onShowBusStations={handleShowBusStations}
        onShowBicycleRoads={handleShowBicycleRoads}
        currency={currency}
        onCurrencyChange={handleCurrencyChange}
      />
      
      <main className="flex-1 container max-w-3xl px-4 pt-4">
        <div className="mb-4">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Map
            </Button>
          </Link>
        </div>
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Your Parking History</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and restore your past parking locations.
          </p>
        </div>
        
        {parkingHistory.length > 0 ? (
          <ParkingHistory 
            parkingHistory={parkingHistory}
            onRestoreLocation={handleRestoreLocation}
            collapsible={false}
          />
        ) : (
          <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-500 dark:text-gray-400">
              No parking history found. Save a parking location to see it here.
            </p>
          </div>
        )}
        
        <Footer />
      </main>
      
      <ThemeToggle />
    </div>
  );
};

export default History;

import React, { useState } from "react";
import { MapPin, Search, Car, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SearchWithSuggestions from "./SearchWithSuggestions";
import { Link } from "react-router-dom";

interface TopNavigationProps {
  onSaveLocation: () => void;
  onRefreshParking: () => void;
  onFindEvChargers: () => void;
  onToggleOfflineMode: () => void;
  onSearchLocation?: (query: string) => void;
  onOpenSidebar: () => void;
  onNavigateHome: () => void;
  isLoading: boolean;
  isOffline: boolean;
  offlineModeEnabled: boolean;
}

const TopNavigation = ({
  onSaveLocation,
  onRefreshParking,
  onSearchLocation,
  onOpenSidebar,
  onNavigateHome,
  isLoading,
  isOffline
}: TopNavigationProps) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    onNavigateHome();
  };

  const handleSearchClick = () => {
    setShowSearchInput(true);
  };

  const handleSearchSubmit = async (query: string) => {
    if (onSearchLocation && query.trim()) {
      await onSearchLocation(query);
      setSearchQuery("");
      setShowSearchInput(false);
    } else {
      onRefreshParking();
      setShowSearchInput(false);
    }
  };

  const handleCloseSearch = () => {
    setShowSearchInput(false);
    setSearchQuery("");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 max-w-6xl mx-auto">
          {/* Logo - now clickable */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center hover:scale-105 transition-transform duration-200 active:scale-95 cursor-pointer"
          >
            <Car className="h-7 w-7 mr-1 text-blue-600 dark:text-blue-400" />
            <h1 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Parking Finder
            </h1>
          </button>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
  onClick={onSaveLocation}
  disabled={isLoading}
  className={cn(
    "flex flex-col items-center justify-center gap-1 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200",
    "text-xs font-medium min-w-[70px] sm:min-w-[80px] min-h-[56px] touch-manipulation",
    "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400",
    "active:scale-95 active:bg-gray-200 dark:active:bg-gray-700 transform hover:scale-105",
    isLoading && "text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50"
  )}
>
  <MapPin className="h-4 w-4" />
  <span className="text-center leading-tight flex items-center justify-center gap-1">
    Save My Location
    {isLoading && (
      <svg className="animate-spin h-4 w-4 text-green-600 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
    )}
  </span>
</button>

            <button
              onClick={handleSearchClick}
              disabled={isLoading || isOffline}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200",
                "text-xs font-medium min-w-[70px] sm:min-w-[80px] min-h-[56px] touch-manipulation",
                "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400",
                "active:scale-95 active:bg-gray-200 dark:active:bg-gray-700 transform hover:scale-105",
                (isLoading || isOffline) && "text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50"
              )}
            >
              <Search className="h-4 w-4" />
              <span className="text-center leading-tight">Search a Location</span>
            </button>

            <button
              onClick={onOpenSidebar}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200",
                "text-xs font-medium min-w-[70px] sm:min-w-[80px] min-h-[56px] touch-manipulation",
                "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400",
                "active:scale-95 active:bg-gray-200 dark:active:bg-gray-700 transform hover:scale-105"
              )}
            >
              <Menu className="h-4 w-4" />
              <span className="text-center leading-tight">Menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Enhanced Search Input */}
      {showSearchInput && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-3 animate-fade-in">
          <div className="max-w-6xl mx-auto">
            <SearchWithSuggestions
              placeholder="Enter city, address, or landmark..."
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearchSubmit}
              onClose={handleCloseSearch}
              autoFocus
              className="w-full"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {isOffline 
                ? "Search is limited while offline. Use current location only."
                : "Type to see suggestions or press Enter to search"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavigation;

import React, { useState } from "react";
import { RefreshCcw, MapPin, LocateFixed, X, Search, Share, CloudOff, BatteryCharging } from "lucide-react";
import ActionButton from "@/components/ActionButton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SearchWithSuggestions from "./SearchWithSuggestions";

interface ParkingActionsProps {
  onRefresh: () => void;
  onSave: () => void;
  onUpdateMode?: () => void;
  onToggleFavorite?: () => void;
  onSearchLocation?: (query: string) => void;
  onShareLocation?: () => void;
  onFindEvChargers?: () => void;
  isLoading: boolean;
  hasParkingLocation: boolean;
  isFavorite?: boolean;
  mapClickMode?: 'normal' | 'update' | 'addNote';
  isOffline?: boolean;
}

const ParkingActions = ({ 
  onRefresh, 
  onSave, 
  onUpdateMode,
  onToggleFavorite,
  onSearchLocation,
  onShareLocation,
  onFindEvChargers,
  isLoading, 
  hasParkingLocation,
  isFavorite = false,
  mapClickMode = 'normal',
  isOffline = false
}: ParkingActionsProps) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [saveQuery, setSaveQuery] = useState("");

  const handleRefreshClick = () => {
    if (isOffline) {
      toast.warning("You're offline", {
        description: "Search and refresh features are limited while offline"
      });
    }
    
    if (!showSearchInput) {
      setShowSearchInput(true);
      setShowSaveInput(false);
    } else if (onSearchLocation && searchQuery.trim()) {
      onSearchLocation(searchQuery);
      // Keep the input visible for potential additional searches
    } else if (!searchQuery.trim()) {
      onRefresh();
    }
  };

  const handleSaveClick = () => {
    if (onUpdateMode) {
      // Toggle update mode
      setShowSaveInput(!showSaveInput);
      setShowSearchInput(false);
      
      if (!showSaveInput) {
        onUpdateMode(); // Enable update mode
        toast.info("Click anywhere on the map to set your parking location", {
          description: "Tap precisely where you parked for better accuracy"
        });
      } else if (mapClickMode === 'update') {
        onUpdateMode(); // Disable update mode if it was enabled
      }
    } else {
      // Just save current location if update mode isn't available
      onSave();
    }
  };

  const handleSearchSubmit = (query: string) => {
    if (onSearchLocation && query.trim()) {
      onSearchLocation(query);
    } else {
      toast.error("Please enter a location to search");
    }
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If we have a save query, we could use it for naming the spot
    // For now just trigger the save function
    onSave();
  };

  const handleCloseSearch = () => {
    setShowSearchInput(false);
    setSearchQuery("");
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ActionButton 
          onClick={handleRefreshClick} 
          isLoading={isLoading}
          icon={
            isOffline ? 
            <CloudOff className="h-5 w-5 text-yellow-500" /> :
            <Search className="h-5 w-5 transition-transform group-hover:scale-110 duration-300" />
          }
          className={`flex-1 group animate-fade-in bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg border border-blue-600/50 dark:border-blue-800 active:scale-95 transition-all ${isOffline ? 'opacity-80' : ''}`}
        >
          <div className="flex flex-col">
            <span className="font-medium">Find Nearby Parking</span>
            <span className="text-xs opacity-85">
              {isOffline ? "Limited while offline" : "Search for parking spots"}
            </span>
          </div>
        </ActionButton>
        
        <ActionButton 
          onClick={handleSaveClick}
          isLoading={isLoading}
          variant="primary"
          icon={mapClickMode === 'update' 
            ? <LocateFixed className="h-5 w-5 animate-pulse" /> 
            : <MapPin className="h-5 w-5 transition-all group-hover:scale-110 duration-300" />
          }
          className={`flex-1 group animate-fade-in delay-100 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg border border-green-600/50 dark:border-green-800 active:scale-95 transition-all ${
            mapClickMode === 'update' ? "ring-2 ring-offset-2 ring-green-500/50" : ""
          }`}
        >
          <div className="flex flex-col">
            <span className="font-medium">{hasParkingLocation ? "Update My Spot" : "Save My Spot"}</span>
            <span className="text-xs opacity-85">{mapClickMode === 'update' ? "Click on map" : "Mark your location"}</span>
          </div>
        </ActionButton>
      </div>

      {/* EV Charging Button */}
      {onFindEvChargers && (
        <div className="flex justify-center">
          <Button
            onClick={onFindEvChargers}
            disabled={isOffline || isLoading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 px-4 py-2 rounded-md shadow-md transition-all"
          >
            <BatteryCharging className="h-4 w-4" />
            Find EV Charging Stations
          </Button>
        </div>
      )}
      
      {/* Share location button - only show if there is a parking location */}
      {hasParkingLocation && onShareLocation && (
        <div className="flex justify-center">
          <Button
            onClick={onShareLocation}
            className="bg-indigo-500 hover:bg-indigo-600 text-white flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all"
          >
            <Share className="h-4 w-4" />
            Share Parking Location
          </Button>
        </div>
      )}
      
      {showSearchInput && (
        <div className="animate-fade-in bg-white dark:bg-gray-800 rounded-md shadow-md p-3 border border-blue-200 dark:border-blue-800">
          <SearchWithSuggestions
            placeholder="Choose a location or address"
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearchSubmit}
            onClose={handleCloseSearch}
            className="w-full"
          />
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {isOffline 
              ? "Search is limited while offline. Use current location only."
              : "Type to see suggestions or press \"Search\" to use your current location"}
          </p>
        </div>
      )}
      
      {showSaveInput && mapClickMode === 'update' && (
        <div className="animate-fade-in bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-md p-3 shadow-md">
          <div className="flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-400">
            <LocateFixed className="h-5 w-5 text-yellow-500 animate-pulse" />
            Click anywhere on the map to set your exact parking location
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingActions;

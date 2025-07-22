
import React from "react";
import { BatteryCharging, Wifi, WifiOff, Fuel } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  onFindEvChargers: () => void;
  onToggleOfflineMode: () => void;
  onFindGasStations: () => void;
  isLoading: boolean;
  isOffline: boolean;
  offlineModeEnabled: boolean;
}

const BottomNavigation = ({
  onFindEvChargers,
  onToggleOfflineMode,
  onFindGasStations,
  isLoading,
  isOffline,
  offlineModeEnabled
}: BottomNavigationProps) => {
  const navItems = [
    {
      id: 'gas',
      icon: Fuel,
      label: 'Find Gas Station',
      onClick: onFindGasStations,
      disabled: isLoading || isOffline
    },
    {
      id: 'ev',
      icon: BatteryCharging,
      label: 'Find EV Charging',
      onClick: onFindEvChargers,
      disabled: isLoading || isOffline
    }
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center max-w-6xl mx-auto">
        {/* Navigation Items - Each takes equal space */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isDisabled = item.disabled;
          
          const baseClasses = cn(
            "flex items-center justify-center gap-2 px-3 py-3 transition-colors flex-1",
            "text-sm font-medium min-h-[60px] touch-manipulation",
            !isDisabled && "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400",
            isDisabled && "text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50"
          );

          return (
            <button
              key={item.id}
              onClick={item.onClick}
              disabled={isDisabled}
              className={baseClasses}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Offline Mode Toggle - Takes equal space */}
        <button
          onClick={onToggleOfflineMode}
          className={cn(
            "flex items-center justify-center gap-2 px-3 py-3 transition-colors flex-1",
            "text-sm font-medium min-h-[60px] touch-manipulation",
            "border-l-2 transition-all duration-200",
            offlineModeEnabled
              ? "bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-400"
              : "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-600 text-green-700 dark:text-green-400"
          )}
        >
          {offlineModeEnabled ? (
            <WifiOff className="h-5 w-5 flex-shrink-0" />
          ) : (
            <Wifi className="h-5 w-5 flex-shrink-0" />
          )}
          <span className="text-xs font-medium">
            {offlineModeEnabled ? "Offline" : "Online"}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;

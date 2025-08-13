
import React from "react";
import { RefreshCcw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ParkingStatisticsProps {
  spotsCount: number;
  lastRefreshTime: Date | null;
  className?: string;
}

export function ParkingStatistics({ 
  spotsCount, 
  lastRefreshTime,
  className = "" 
}: ParkingStatisticsProps) {
  if (!lastRefreshTime) return null;

  return (
    <div className={`text-xs text-gray-500 dark:text-gray-400 flex items-center justify-end animate-fade-in ${className}`}>
      <RefreshCcw className="h-3 w-3 mr-1 opacity-70" />
      <span>
        {spotsCount > 0 
          ? `${spotsCount} spots found` 
          : "No parking spots found"} 
        {" • "} 
        Last updated {formatDistanceToNow(lastRefreshTime, { addSuffix: true })}
      </span>
    </div>
  );
}

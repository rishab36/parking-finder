
import React, { useState } from "react";
import { ParkingLocation, formatTimestamp, formatTimeSince } from "@/lib/parkingUtils";
import { Button } from "@/components/ui/button";
import { History, ChevronDown, ChevronUp } from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Link } from "react-router-dom";

interface ParkingHistoryProps {
  parkingHistory: ParkingLocation[];
  onRestoreLocation: (location: ParkingLocation) => void;
  className?: string;
  collapsible?: boolean;
}

const ParkingHistory: React.FC<ParkingHistoryProps> = ({ 
  parkingHistory, 
  onRestoreLocation,
  className = "",
  collapsible = true
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (parkingHistory.length === 0) {
    return null;
  }

  const renderHistoryContent = () => (
    <div className="p-3 border-t border-gray-100 dark:border-gray-700">
      <div className="space-y-2">
        {parkingHistory.map((location, index) => (
          <div 
            key={location.timestamp} 
            className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md hover:scale-[1.01] transition-transform"
          >
            <div className="flex justify-between">
              <div>
                <div className="font-medium">
                  {location.note || `Parking spot ${index + 1}`}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatTimestamp(location.timestamp)} ({formatTimeSince(location.timestamp)} ago)
                </div>
              </div>
              <Button 
                size="sm" 
                onClick={() => onRestoreLocation(location)}
                className="h-8 bg-green-500 hover:bg-green-600 text-white"
              >
                Restore
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (!collapsible) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md glassmorphic ${className}`}>
        <div className="px-4 py-3">
          <div className="flex items-center">
            <History className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="font-medium">Parking History</h3>
          </div>
        </div>
        {renderHistoryContent()}
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md glassmorphic ${className}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex justify-between items-center">
          <CollapsibleTrigger asChild>
            <button
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-lg"
            >
              <div className="flex items-center">
                <History className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-medium">Recent Parking History</h3>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">{parkingHistory.length} location{parkingHistory.length > 1 ? 's' : ''}</span>
                {isOpen ? 
                  <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                }
              </div>
            </button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          {renderHistoryContent()}
        </CollapsibleContent>
      </Collapsible>
      
      <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
        <Link to="/history">
          <Button 
            variant="outline" 
            className="w-full text-gray-700 dark:text-gray-300 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/30"
          >
            <History className="h-4 w-4 mr-2" />
            View Full History
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ParkingHistory;

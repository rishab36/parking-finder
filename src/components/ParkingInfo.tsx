
import React from "react";
import { ParkingSpot, ParkingLocation, formatDistance, formatTimeSince } from "@/lib/parkingUtils";
import { Car, Navigation, Clock, Star, X, MapPin, Share, FileEdit, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import SharePopover from "@/components/SharePopover";

interface ParkingInfoProps {
  parkingSpots: ParkingSpot[];
  selectedSpot: ParkingSpot | null;
  parkingLocation: ParkingLocation | null;
  onGetDirections: (spot: ParkingSpot) => void;
  onReset: () => void;
  onToggleFavorite?: () => void;
  onShareLocation?: () => void;
  onAddNote?: () => void;
  isFavorite: boolean;
  currency?: string;
  userLocation?: [number, number] | null;
  showPaidParking?: boolean;
}

const ParkingInfo = ({
  parkingSpots,
  selectedSpot,
  parkingLocation,
  onGetDirections,
  onReset,
  onToggleFavorite,
  onShareLocation,
  onAddNote,
  isFavorite,
  currency = "USD",
  userLocation = null,
  showPaidParking = false
}: ParkingInfoProps) => {
  // If no parking location and no spots, show nothing
  if (!parkingLocation && parkingSpots.length === 0 && !selectedSpot) {
    return null;
  }

  return (
    <div className="mb-4 space-y-4">
      {/* Detailed parking spot info when selected */}
      {selectedSpot && (
        <div className={`relative p-4 rounded-xl border shadow-md animate-scale-in ${
          showPaidParking 
            ? 'border-blue-200 dark:border-blue-800/50 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/20'
            : 'border-green-200 dark:border-green-800/50 bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-900/30 dark:to-green-800/20'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full text-white shadow-md ${
              showPaidParking 
                ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                : 'bg-gradient-to-br from-green-500 to-green-600'
            }`}>
              {showPaidParking ? <CreditCard className="h-5 w-5" /> : <Car className="h-5 w-5" />}
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold ${
                showPaidParking 
                  ? 'text-blue-900 dark:text-blue-100'
                  : 'text-green-900 dark:text-green-100'
              }`}>
                {selectedSpot.name || "Parking Area"}
              </h3>
              <div className={`flex items-center text-sm ${
                showPaidParking 
                  ? 'text-blue-700 dark:text-blue-300'
                  : 'text-green-700 dark:text-green-300'
              }`}>
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{selectedSpot.operator || "Public Parking"}</span>
              </div>
            </div>
            <div className="text-right">
              {showPaidParking ? (
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    PAID
                  </div>
                  <div className="text-xs text-gray-500">parking</div>
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    FREE
                  </div>
                  <div className="text-xs text-gray-500">parking</div>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <div className="flex items-center justify-between">
              <span>Type:</span>
              <span className={`font-medium ${
                showPaidParking ? 'text-blue-600' : 'text-green-600'
              }`}>
                {showPaidParking ? 'Paid Public Parking' : 'Free Public Parking'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Access:</span>
              <span className="font-medium">24/7 Available</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Distance:</span>
              <span className="font-medium">
                {userLocation ? 
                  `${(Math.sqrt(Math.pow(selectedSpot.latitude - userLocation[0], 2) + Math.pow(selectedSpot.longitude - userLocation[1], 2)) * 111).toFixed(1)} km` 
                  : 'Calculating...'
                }
              </span>
            </div>
            {showPaidParking && (
              <div className="flex items-center justify-between">
                <span>Payment:</span>
                <span className="font-medium">Card & Cash Accepted</span>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button 
              onClick={() => onGetDirections(selectedSpot)}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Navigation className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
            {onToggleFavorite && (
              <Button 
                onClick={onToggleFavorite}
                variant={isFavorite ? "default" : "outline"}
                className="flex items-center gap-2"
              >
                <Star className={`h-4 w-4 ${isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`} />
                {isFavorite ? "Saved" : "Save"}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* My parking location - only show if no spot is selected */}
      {parkingLocation && !selectedSpot && (
        <div className="relative p-4 rounded-xl border border-green-200 dark:border-green-800/50 bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-900/30 dark:to-green-800/20 shadow-md animate-scale-in">
          <div className="absolute top-3 right-3">
            <button
              onClick={onReset}
              className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              aria-label="Clear parking location"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full text-white shadow-md">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100">
                {parkingLocation.note || "My Parking Spot"}
              </h3>
              <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>Parked {formatTimeSince(parkingLocation.timestamp)} ago</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex flex-col gap-1">
            <p className="font-medium">Location coordinates:</p>
            <p className="font-mono text-xs bg-green-50 dark:bg-green-900/30 p-1 rounded">
              {parkingLocation.latitude.toFixed(6)}, {parkingLocation.longitude.toFixed(6)}
            </p>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {onShareLocation && (
              <div className="flex flex-col gap-2 flex-1 sm:flex-none">
                <SharePopover 
                  parkingLocation={parkingLocation}
                  onShareLocation={onShareLocation}
                />
              </div>
            )}
            
            {onAddNote && (
              <Button 
                onClick={onAddNote}
                variant="outline"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700"
                size="sm"
              >
                <FileEdit className="h-4 w-4" />
                {parkingLocation.note ? "Edit Note" : "Add Note"}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingInfo;

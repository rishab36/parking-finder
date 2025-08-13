
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Coins, ParkingCircle, CreditCard, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ParkingToggleProps {
  showPaidParking: boolean;
  onToggle: (enabled: boolean) => void;
  isLoading?: boolean;
  currency: string;
}

const ParkingToggle = ({ showPaidParking, onToggle, isLoading = false, currency }: ParkingToggleProps) => {
  // Check if current location is India
  const isIndia = currency === 'INR';
  
  const handleToggle = (enabled: boolean) => {
    if (isIndia && enabled) {
      toast({
        title: "Feature Coming Soon",
        description: "Paid parking search is coming soon for India. Currently showing free parking only.",
      });
      return;
    }
    onToggle(enabled);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-md animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
          Parking Type
        </h3>
        {isLoading && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Loading...</span>
          </div>
        )}
      </div>
      
      <div className="relative">
        {/* Toggle Container */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1.5 transition-all duration-300">
          {/* Free Parking Button */}
          <button
            onClick={() => handleToggle(false)}
            disabled={isLoading}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
              !showPaidParking
                ? 'bg-green-500 text-white shadow-md transform scale-105'
                : 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
            }`}
          >
            <ParkingCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Free Parking</span>
            <span className="sm:hidden">Free</span>
          </button>
          
          {/* Paid Parking Button */}
          <button
            onClick={() => handleToggle(true)}
            disabled={isLoading || isIndia}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
              showPaidParking
                ? 'bg-blue-500 text-white shadow-md transform scale-105'
                : isIndia
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Paid Parking</span>
            <span className="sm:hidden">Paid</span>
          </button>
        </div>
        
        {/* Status indicator */}
        <div className="mt-3 text-center">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
            showPaidParking
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              showPaidParking ? 'bg-blue-500' : 'bg-green-500'
            }`}></div>
            {isIndia ? (
              "Free parking spots only - Paid parking coming soon for India"
            ) : showPaidParking ? (
              "Showing paid parking with pricing information"
            ) : (
              "Showing free parking spots only"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingToggle;

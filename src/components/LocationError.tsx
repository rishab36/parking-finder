
import React from "react";
import { AlertCircle } from "lucide-react";

interface LocationErrorProps {
  error: string | null;
}

const LocationError = ({ error }: LocationErrorProps) => {
  if (!error) return null;
  
  return (
    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-300 rounded-lg shadow-sm animate-fade-in">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium">{error}</p>
          <p className="text-sm mt-1 opacity-80">
            Tip: Make sure location permissions are allowed for this website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationError;

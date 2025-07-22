
import React from "react";
import { WifiOff } from "lucide-react";

interface OfflineNoticeProps {
  isOffline: boolean;
  className?: string;
}

const OfflineNotice = ({ isOffline, className = "" }: OfflineNoticeProps) => {
  if (!isOffline) return null;

  return (
    <div className={`bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800/30 rounded-xl p-3 mb-4 flex items-center gap-2 animate-pulse ${className}`}>
      <WifiOff className="h-5 w-5" />
      <div>
        <h3 className="font-medium">You're offline</h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          Limited functionality available. Maps may use cached data.
        </p>
      </div>
    </div>
  );
};

export default OfflineNotice;

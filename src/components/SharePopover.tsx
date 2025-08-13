import React, { useState } from "react";
import { Share, Clipboard, Mail, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ParkingLocation {
  latitude: number;
  longitude: number;
  note?: string;
}

interface SharePopoverProps {
  parkingLocation: ParkingLocation;
  onShareLocation: () => void;
}

const getShareUrl = (loc: ParkingLocation) =>
  `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;

const getShareText = (loc: ParkingLocation) =>
  loc.note
    ? `Find my car at: ${loc.note} (${loc.latitude}, ${loc.longitude})`
    : `Find my car at coordinates: ${loc.latitude}, ${loc.longitude}`;

export const SharePopover: React.FC<SharePopoverProps> = ({ parkingLocation, onShareLocation }) => {
  const [open, setOpen] = useState(false);
  const shareUrl = getShareUrl(parkingLocation);
  const shareText = getShareText(parkingLocation);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
  title: "Location link copied to clipboard"
});
      setOpen(false);
    } catch {
      toast({
  title: "Couldn't copy location link"
});
    }
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`,
      "_blank"
    );
    setOpen(false);
  };

  const handleEmail = () => {
    window.open(
      `mailto:?subject=My Parked Car Location&body=${encodeURIComponent(shareText + '\n' + shareUrl)}`,
      "_blank"
    );
    setOpen(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white"
        size="sm"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Share Location"
      >
        <Share className="h-4 w-4" />
        Share Location
      </Button>
      {open && (
        <div className="fixed z-[9999] w-64 max-w-[90vw] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 animate-fade-in flex flex-col gap-2" style={{
  boxShadow: '0 8px 32px rgba(0,0,0,0.20)',
  minWidth: 220,
  top: 'calc(50% - 100px)',
  left: 'calc(50% - 100px)',
  transform: 'translate(-50%, -50%)',
  position: 'fixed',
  zIndex: 9999
}}>

          <button
            onClick={onShareLocation}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-indigo-50 dark:hover:bg-gray-800 text-indigo-700 dark:text-indigo-300 font-medium"
          >
            <Share className="h-4 w-4" />
            System Share
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-green-50 dark:hover:bg-green-900 text-green-700 dark:text-green-300 font-medium"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </button>
          <button
            onClick={handleEmail}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
          >
            <Mail className="h-4 w-4" />
            Email
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
          >
            <Clipboard className="h-4 w-4" />
            Copy Link
          </button>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-700 dark:hover:text-gray-100 z-[10000]"
            aria-label="Close share options"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SharePopover;

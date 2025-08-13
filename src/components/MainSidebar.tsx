import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fuel, Bus, Bike, Settings, Info, BookOpen, Apple, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CurrencySelector from "./CurrencySelector";
import AboutTab from "./AboutTab";

interface MainSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: [number, number] | null;
  onShowGasStations: (stations: any[]) => void;
  onShowBusStations: (stations: any[]) => void;
  onShowBicycleRoads: (roads: any[]) => void;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

const MainSidebar = ({ 
  isOpen, 
  onClose, 
  currentLocation, 
  onShowGasStations, 
  onShowBusStations,
  onShowBicycleRoads,
  currency, 
  onCurrencyChange 
}: MainSidebarProps) => {
  const [isLoadingGas, setIsLoadingGas] = useState(false);
  const [isLoadingBus, setIsLoadingBus] = useState(false);
  const [isLoadingBike, setIsLoadingBike] = useState(false);
  const navigate = useNavigate();

  const handleHowToUseClick = () => {
    navigate('/how-to-use');
    onClose();
  };

  const handleFindGasStations = async () => {
    if (!currentLocation) {
      console.log("No current location available");
      return;
    }

    setIsLoadingGas(true);
    
    try {
      const { findGasStations } = await import("@/lib/parkingUtils");
      let stations = await findGasStations(currentLocation[0], currentLocation[1]);

      // If no stations found in current area, search again (the function itself handles wider search)
      if (stations.length === 0) {
        console.log("No gas stations found in current area, searching wider area...");
        stations = await findGasStations(currentLocation[0], currentLocation[1]);
        
        if (stations.length > 0) {
          const nearest = stations[0];
          onShowGasStations(stations);
          onClose();
          
          setTimeout(async () => {
            const { toast } = await import("@/hooks/use-toast");
            toast({
              title: "Zoomed to nearest gas stations",
              description: `Found stations ${nearest.distance ? Math.round(nearest.distance) + 'km' : ''} away`
            });
          }, 500);
          
          return;
        }
      }

      onShowGasStations(stations);
      onClose();
    } catch (error) {
      console.error("Error finding gas stations:", error);
    } finally {
      setIsLoadingGas(false);
    }
  };

  const handleFindBusStations = async () => {
    if (!currentLocation) {
      console.log("No current location available");
      return;
    }

    setIsLoadingBus(true);
    
    try {
      const { findBusStations } = await import("@/lib/parkingUtils");
      const stations = await findBusStations(currentLocation[0], currentLocation[1]);

      onShowBusStations(stations);
      onClose();
    } catch (error) {
      console.error("Error finding bus stations:", error);
    } finally {
      setIsLoadingBus(false);
    }
  };

  const handleFindBicycleRoads = async () => {
    if (!currentLocation) {
      console.log("No current location available");
      return;
    }

    setIsLoadingBike(true);
    
    try {
      const { findBicycleRoads } = await import("@/lib/parkingUtils");
      const roads = await findBicycleRoads(currentLocation[0], currentLocation[1]);

      onShowBicycleRoads(roads);
      onClose();
    } catch (error) {
      console.error("Error finding bicycle roads:", error);
    } finally {
      setIsLoadingBike(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        
        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            {/* Download Now Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Download Now</h3>
              <div className="flex gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=co.median.android.ljwerj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors border-2 border-green-500"
                >
                  <Play className="h-5 w-5" />
                  <span className="text-sm font-medium">Play Store</span>
                </a>
                
                <a
                  href="https://apps.apple.com/us/app/parkingfinder-tech/id6746726849"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 hover:bg-black text-white rounded-lg transition-colors border-2 border-gray-700"
                >
                  <Apple className="h-5 w-5" />
                  <span className="text-sm font-medium">App Store</span>
                </a>
              </div>
            </div>

            {/* How to Use Button */}
            <div className="space-y-3">
              <Button
                onClick={handleHowToUseClick}
                className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                How to Use
              </Button>
            </div>

            {/* Currency Selection */}
            <div className="space-y-3">
              <CurrencySelector
                selectedCurrency={currency}
                onCurrencyChange={onCurrencyChange}
              />
            </div>

            {/* Nearby Services */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Nearby Services</h3>
              
              <Button
                onClick={handleFindGasStations}
                disabled={!currentLocation || isLoadingGas}
                className="w-full"
                variant="outline"
              >
                <Fuel className="h-4 w-4 mr-2" />
                {isLoadingGas ? "Finding..." : "Find Gas Stations"}
              </Button>

              <Button
                onClick={handleFindBusStations}
                disabled={!currentLocation || isLoadingBus}
                className="w-full"
                variant="outline"
              >
                <Bus className="h-4 w-4 mr-2" />
                {isLoadingBus ? "Finding..." : "Find Bus Stations"}
              </Button>

              <Button
                onClick={handleFindBicycleRoads}
                disabled={!currentLocation || isLoadingBike}
                className="w-full"
                variant="outline"
              >
                <Bike className="h-4 w-4 mr-2" />
                {isLoadingBike ? "Finding..." : "Find Bicycle Roads"}
              </Button>
            </div>

            {/* Current Location Display */}
            {currentLocation && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Current Location</h3>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div>Lat: {currentLocation[0].toFixed(6)}</div>
                  <div>Lng: {currentLocation[1].toFixed(6)}</div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="about">
            <AboutTab />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default MainSidebar;

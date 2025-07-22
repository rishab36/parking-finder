import React, { useEffect, useRef, useState } from "react";
import { MapPinIcon, WifiOff } from "lucide-react";
import { ParkingLocation, ParkingSpot, formatDistance } from "@/lib/parkingUtils";

interface GasStation {
  id: string;
  name: string;
  address: string;
  price: number;
  distance: number;
  latitude: number;
  longitude: number;
}

interface BusStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  routes?: string[];
}

interface BicycleRoad {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  length?: number;
}

interface ParkingMapProps {
  location: ParkingLocation | null;
  currentLocation?: [number, number] | null;
  parkingSpots?: ParkingSpot[];
  gasStations?: GasStation[];
  busStations?: BusStation[];
  bicycleRoads?: BicycleRoad[];
  onMarkerClick?: (spot: ParkingSpot) => void;
  onGasStationClick?: (station: GasStation) => void;
  onMapClick?: (lat: number, lng: number) => void;
  clickMode?: 'normal' | 'update' | 'addNote';
  selectedSpot?: ParkingSpot | null;
  selectedGasStation?: GasStation | null;
  isOffline?: boolean;
  searchedLocation?: [number, number] | null;
  showGasStations?: boolean;
  showBusStations?: boolean;
  showBicycleRoads?: boolean;
  currency?: string;
}

const ParkingMap = ({ 
  location, 
  currentLocation, 
  parkingSpots = [], 
  gasStations = [],
  busStations = [],
  bicycleRoads = [],
  onMarkerClick,
  onGasStationClick,
  onMapClick,
  clickMode = 'normal',
  selectedSpot = null,
  selectedGasStation = null,
  isOffline = false,
  searchedLocation = null,
  showGasStations = false,
  showBusStations = false,
  showBicycleRoads = false,
  currency = 'USD'
}: ParkingMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any>({
    parking: null,
    current: null,
    spots: [],
    gasStations: [],
    busStations: [],
    bicycleRoads: [],
    tempMarker: null,
    highlighted: null,
    highlightedGas: null,
  });
  const [mapInitialized, setMapInitialized] = useState(false);
  const [mapLoadError, setMapLoadError] = useState(false);
  const [hasAutoFittedBounds, setHasAutoFittedBounds] = useState(false);

  const getCurrencySymbol = (currencyCode: string) => {
    const symbols: { [key: string]: string } = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      CAD: 'C$',
      AUD: 'A$',
      JPY: '¥',
      INR: '₹',
      CNY: '¥',
      BRL: 'R$',
      MXN: '$',
    };
    return symbols[currencyCode] || currencyCode;
  };

  // Show visual indicator for click mode
  useEffect(() => {
    if (mapContainerRef.current) {
      mapContainerRef.current.style.cursor = clickMode === 'update' ? 'crosshair' : '';
    }
  }, [clickMode]);

  useEffect(() => {
    const initMap = async () => {
      if (!mapContainerRef.current || mapRef.current) return;

      try {
        const L = await import("leaflet");
        await import("leaflet/dist/leaflet.css");

        const map = L.map(mapContainerRef.current, {
          attributionControl: false,
          zoomControl: true
        }).setView(
          currentLocation || (location ? [location.latitude, location.longitude] : [40, -95]),
          currentLocation || location ? 17 : 4
        );

        const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19,
        });

        tileLayer.on("tileerror", (error) => {
          console.warn("Tile loading error:", error);
          if (isOffline) setMapLoadError(true);
        });

        tileLayer.addTo(map);
        mapRef.current = map;
        setMapInitialized(true);
        setHasAutoFittedBounds(false);
      } catch (err) {
        console.error("Map init failed:", err);
        setMapLoadError(true);
      }
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Handle search location zoom - only once when searchedLocation changes
  useEffect(() => {
    if (mapInitialized && mapRef.current && searchedLocation) {
      mapRef.current.setView(searchedLocation, 16, { animate: true });
      setHasAutoFittedBounds(true); // Mark that we've auto-fitted to prevent further auto-fitting
    }
  }, [searchedLocation, mapInitialized]);

  useEffect(() => {
    const attachClickHandler = async () => {
      if (!mapInitialized || !mapRef.current) return;
      const L = await import("leaflet");

      mapRef.current.off('click');
      mapRef.current.on('click', (e: any) => {
        if (clickMode === 'update') {
          const lat = e.latlng.lat;
          const lng = e.latlng.lng;
          if (onMapClick) onMapClick(lat, lng);

          if (markersRef.current.tempMarker) {
            mapRef.current.removeLayer(markersRef.current.tempMarker);
            markersRef.current.tempMarker = null;
          }

          const tempIcon = L.divIcon({
            html: `<div class="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full text-white animate-pulse shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>`,
            className: 'temp-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
          });

          markersRef.current.tempMarker = L.marker([lat, lng], { icon: tempIcon }).addTo(mapRef.current);
        }
      });
    };

    attachClickHandler();
  }, [clickMode, mapInitialized, onMapClick]);

  useEffect(() => {
    const updateMarkers = async () => {
      if (!mapInitialized || !mapRef.current) return;
      const L = await import("leaflet");

      const parkingIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full text-white shadow-xl transform hover:scale-110 transition-all">
                <span class="font-bold text-xl">P</span>
              </div>`,
        className: 'custom-marker',
        iconSize: [48, 48],
        iconAnchor: [24, 48],
      });

      const currentLocationIcon = L.divIcon({
        html: `<div class="relative">
                <div class="absolute -inset-2 bg-blue-500/30 rounded-full animate-ping"></div>
                <div class="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full text-white shadow-lg border-2 border-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
                    <circle cx="12" cy="12" r="10" fill="rgba(59, 130, 246, 0.2)" stroke="white" stroke-width="2"/>
                    <circle cx="12" cy="12" r="4" fill="white"/>
                  </svg>
                </div>
              </div>`,
        className: 'current-location-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const parkingSpotIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-green-500 to-green-600 rounded-full text-white shadow-lg transform hover:scale-110 transition-all">
                <span class="font-bold text-sm">P</span>
              </div>`,
        className: 'parking-spot-marker',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
      });
      
      const highlightedSpotIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full text-white shadow-xl ring-4 ring-yellow-300 dark:ring-yellow-700 transform hover:scale-110 transition-all animate-pulse z-10">
                <span class="font-bold text-lg">P</span>
              </div>`,
        className: 'highlighted-spot-marker',
        iconSize: [48, 48],
        iconAnchor: [24, 48],
      });

      const gasStationIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full text-white shadow-lg transform hover:scale-110 transition-all">
                <span class="font-bold text-sm">⛽</span>
              </div>`,
        className: 'gas-station-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const highlightedGasIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full text-white shadow-xl ring-4 ring-orange-300 dark:ring-orange-700 transform hover:scale-110 transition-all animate-pulse z-10">
                <span class="font-bold text-lg">⛽</span>
              </div>`,
        className: 'highlighted-gas-marker',
        iconSize: [48, 48],
        iconAnchor: [24, 48],
      });

      const busStationIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full text-white shadow-lg transform hover:scale-110 transition-all">
                <span class="font-bold text-sm">🚌</span>
              </div>`,
        className: 'bus-station-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const bicycleRoadIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full text-white shadow-lg transform hover:scale-110 transition-all">
                <span class="font-bold text-sm">🚴</span>
              </div>`,
        className: 'bicycle-road-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      // Remove all old markers
      if (markersRef.current.parking) {
        mapRef.current.removeLayer(markersRef.current.parking);
        markersRef.current.parking = null;
      }
      if (markersRef.current.current) {
        mapRef.current.removeLayer(markersRef.current.current);
        markersRef.current.current = null;
      }
      if (markersRef.current.highlighted) {
        mapRef.current.removeLayer(markersRef.current.highlighted);
        markersRef.current.highlighted = null;
      }
      if (markersRef.current.highlightedGas) {
        mapRef.current.removeLayer(markersRef.current.highlightedGas);
        markersRef.current.highlightedGas = null;
      }
      
      // Clear all spot markers
      markersRef.current.spots.forEach((marker: any) => mapRef.current.removeLayer(marker));
      markersRef.current.spots = [];
      
      // Clear all gas station markers
      markersRef.current.gasStations.forEach((marker: any) => mapRef.current.removeLayer(marker));
      markersRef.current.gasStations = [];
      
      // Clear all bus station markers
      markersRef.current.busStations.forEach((marker: any) => mapRef.current.removeLayer(marker));
      markersRef.current.busStations = [];
      
      // Clear all bicycle road markers
      markersRef.current.bicycleRoads.forEach((marker: any) => mapRef.current.removeLayer(marker));
      markersRef.current.bicycleRoads = [];

      // Parking location
      if (location) {
        markersRef.current.parking = L.marker([location.latitude, location.longitude], { icon: parkingIcon })
          .addTo(mapRef.current)
          .bindPopup(`<b>${location.note || 'Your parking spot'}</b>`)
          .openPopup();

        L.circle([location.latitude, location.longitude], {
          color: 'rgba(59,130,246,0.3)',
          fillColor: 'rgba(59,130,246,0.1)',
          fillOpacity: 0.5,
          radius: 50,
        }).addTo(mapRef.current);
      }

      // Current location
      if (currentLocation) {
        markersRef.current.current = L.marker(currentLocation, { icon: currentLocationIcon })
          .addTo(mapRef.current)
          .bindPopup("Current location");
      }

      // Show bus stations if requested
      if (showBusStations && busStations.length > 0) {
        busStations.forEach((station) => {
          const popupContent = `
            <div class="bus-station-popup" style="min-width: 200px;">
              <div class="font-semibold text-lg mb-2">${station.name}</div>
              <div class="text-sm text-gray-600 mb-2">${station.address}</div>
              ${station.routes ? `<div class="text-sm text-blue-600 mb-2">Routes: ${station.routes.join(', ')}</div>` : ''}
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Type:</span>
                  <span class="text-blue-600 font-medium">Bus Stop</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Status:</span>
                  <span class="text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          `;
          
          const marker = L.marker([station.latitude, station.longitude], { icon: busStationIcon })
            .addTo(mapRef.current)
            .bindPopup(popupContent, {
              maxWidth: 250,
              className: 'bus-station-popup-container'
            });

          markersRef.current.busStations.push(marker);
        });
        
        // Auto-fit bounds ONCE when bus stations are first loaded
        if (currentLocation && busStations.length > 0 && !hasAutoFittedBounds) {
          const bounds = L.latLngBounds(currentLocation, currentLocation);
          busStations.forEach(station => {
            bounds.extend([station.latitude, station.longitude]);
          });
          mapRef.current.fitBounds(bounds, { padding: [50, 50] });
          setHasAutoFittedBounds(true);
        }
      } 
      // Show bicycle roads if requested
      else if (showBicycleRoads && bicycleRoads.length > 0) {
        bicycleRoads.forEach((road) => {
          const popupContent = `
            <div class="bicycle-road-popup" style="min-width: 200px;">
              <div class="font-semibold text-lg mb-2">${road.name}</div>
              <div class="text-sm text-gray-600 mb-2">Type: ${road.type}</div>
              ${road.length ? `<div class="text-sm text-green-600 mb-2">Length: ${road.length}m</div>` : ''}
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Surface:</span>
                  <span class="text-green-600 font-medium">Bicycle Lane</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Status:</span>
                  <span class="text-green-600 font-medium">Available</span>
                </div>
              </div>
            </div>
          `;
          
          const marker = L.marker([road.latitude, road.longitude], { icon: bicycleRoadIcon })
            .addTo(mapRef.current)
            .bindPopup(popupContent, {
              maxWidth: 250,
              className: 'bicycle-road-popup-container'
            });

          markersRef.current.bicycleRoads.push(marker);
        });
        
        // Auto-fit bounds ONCE when bicycle roads are first loaded
        if (currentLocation && bicycleRoads.length > 0 && !hasAutoFittedBounds) {
          const bounds = L.latLngBounds(currentLocation, currentLocation);
          bicycleRoads.forEach(road => {
            bounds.extend([road.latitude, road.longitude]);
          });
          mapRef.current.fitBounds(bounds, { padding: [50, 50] });
          setHasAutoFittedBounds(true);
        }
      }
      // Show gas stations if requested
      else if (showGasStations && gasStations.length > 0) {
        gasStations.forEach((station) => {
          const isSelected = selectedGasStation && selectedGasStation.id === station.id;
          const icon = isSelected ? highlightedGasIcon : gasStationIcon;
          const currencySymbol = getCurrencySymbol(currency);
          
          const popupContent = `
            <div class="gas-station-popup" style="min-width: 200px;">
              <div class="font-semibold text-lg mb-2">${station.name}</div>
              <div class="text-sm text-gray-600 mb-2">${station.address}</div>
              <div class="text-lg font-bold text-green-600 mb-2">${currencySymbol}${station.price.toFixed(2)}/gal</div>
              <div class="text-xs text-gray-500 mb-3">${station.distance.toFixed(1)} km away</div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Status:</span>
                  <span class="text-green-600 font-medium">Open 24/7</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Wait time:</span>
                  <span class="text-blue-600 font-medium">2-5 min</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Rating:</span>
                  <span class="text-yellow-600 font-medium">★ 4.2</span>
                </div>
              </div>
            </div>
          `;
          
          const marker = L.marker([station.latitude, station.longitude], { icon })
            .addTo(mapRef.current)
            .bindPopup(popupContent, {
              maxWidth: 250,
              className: 'gas-station-popup-container'
            })
            .on("click", (e) => {
              L.DomEvent.stopPropagation(e);
              if (onGasStationClick) {
                onGasStationClick(station);
              }
              // Keep popup open
              marker.openPopup();
            });

          if (isSelected) {
            markersRef.current.highlightedGas = marker;
            marker.openPopup(); // Keep popup open for selected station
          } else {
            markersRef.current.gasStations.push(marker);
          }
        });
        
        // Auto-fit bounds ONCE when gas stations are first loaded and no specific selection
        if (!selectedGasStation && currentLocation && gasStations.length > 0 && !hasAutoFittedBounds) {
          const bounds = L.latLngBounds(currentLocation, currentLocation);
          gasStations.forEach(station => {
            bounds.extend([station.latitude, station.longitude]);
          });
          mapRef.current.fitBounds(bounds, { padding: [50, 50] });
          setHasAutoFittedBounds(true);
        }
      } 
      // Show parking spots (free, paid, or EV chargers) if not showing other services
      else if (!showGasStations && !showBusStations && !showBicycleRoads && parkingSpots.length > 0) {
        const currencySymbol = getCurrencySymbol(currency);
        
        parkingSpots.forEach((spot) => {
          const isSelected = selectedSpot && selectedSpot.id === spot.id;
          const icon = isSelected ? highlightedSpotIcon : parkingSpotIcon;
          
          // Enhanced popup content with more features
          const displayName = spot.name || 'Public Parking Area';
          
          let popupContent = `
            <div class="parking-spot-popup" style="min-width: 200px;">
              <div class="font-semibold text-lg mb-2">${displayName}</div>
          `;
          
          if (spot.distance) {
            popupContent += `<div class="text-sm text-gray-600 mb-2">${formatDistance(spot.distance)} away</div>`;
          }
          
          // Handle EV charger specific information
          if (spot.amenity === 'charging_station') {
            popupContent += `
              <div class="space-y-1 mb-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Type:</span>
                  <span class="font-medium text-blue-600">EV Charging Station</span>
                </div>
                ${'operator' in spot && spot.operator ? `<div class="flex justify-between text-sm">
                  <span class="text-gray-600">Operator:</span>
                  <span class="font-medium text-green-600">${spot.operator}</span>
                </div>` : ''}
                ${'socket' in spot && spot.socket ? `<div class="flex justify-between text-sm">
                  <span class="text-gray-600">Socket:</span>
                  <span class="font-medium text-blue-600">${spot.socket}</span>
                </div>` : ''}
                ${'voltage' in spot && spot.voltage ? `<div class="flex justify-between text-sm">
                  <span class="text-gray-600">Voltage:</span>
                  <span class="font-medium text-orange-600">${spot.voltage}V</span>
                </div>` : ''}
              </div>
            `;
          } else {
            // Pricing information for regular parking with dynamic currency
            if (spot.carFee && spot.bikeFee) {
              popupContent += `
                <div class="space-y-1 mb-3">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Car:</span>
                    <span class="font-medium text-green-600">${currencySymbol}${spot.carFee.toFixed(2)}/hr</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Bike:</span>
                    <span class="font-medium text-green-600">${currencySymbol}${spot.bikeFee.toFixed(2)}/hr</span>
                  </div>
                </div>
              `;
            } else if (spot.price) {
              popupContent += `
                <div class="mb-3">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Rate:</span>
                    <span class="font-medium text-green-600">${currencySymbol}${spot.price.toFixed(2)}/hr</span>
                  </div>
                </div>
              `;
            } else {
              popupContent += `<div class="text-green-600 font-medium mb-3">Free Parking</div>`;
            }
          }
          
          // Additional features
          popupContent += `<div class="space-y-1 text-xs text-gray-500">`;
          
          if (spot.capacity) {
            popupContent += `<div>Capacity: ${spot.capacity}</div>`;
          }
          
          if (spot.surface) {
            popupContent += `<div>Surface: ${spot.surface}</div>`;
          }
          
          if (spot.access) {
            popupContent += `<div>Access: ${spot.access}</div>`;
          }
          
          if (spot.maxstay) {
            popupContent += `<div>Max stay: ${spot.maxstay}</div>`;
          }
          
          if (spot.operator && spot.amenity !== 'charging_station') {
            popupContent += `<div>Operator: ${spot.operator}</div>`;
          }
          
          popupContent += `</div></div>`;

          const marker = L.marker([spot.latitude, spot.longitude], { icon })
            .addTo(mapRef.current)
            .bindPopup(popupContent, {
              maxWidth: 250,
              className: 'parking-spot-popup-container'
            })
            .on("click", (e) => {
              L.DomEvent.stopPropagation(e);
              if (onMarkerClick) {
                onMarkerClick(spot);
              }
              // Keep popup open
              marker.openPopup();
            });

          if (isSelected) {
            markersRef.current.highlighted = marker;
            marker.openPopup(); // Keep popup open for selected spot
          } else {
            markersRef.current.spots.push(marker);
          }
        });
        
        // Auto-fit bounds ONCE when parking spots (free, paid, or EV) are first loaded and no specific selection
        if (!selectedSpot && currentLocation && parkingSpots.length > 0 && !searchedLocation && !hasAutoFittedBounds) {
          const bounds = L.latLngBounds(currentLocation, currentLocation);
          parkingSpots.forEach(spot => {
            bounds.extend([spot.latitude, spot.longitude]);
          });
          mapRef.current.fitBounds(bounds, { padding: [50, 50] });
          setHasAutoFittedBounds(true);
        }
      }
      
      // If we have both current and parking locations, fit bounds to show both (only on initial load)
      if (location && currentLocation && !selectedSpot && parkingSpots.length === 0 && !showGasStations && !searchedLocation && !hasAutoFittedBounds) {
        const bounds = L.latLngBounds(
          [location.latitude, location.longitude], 
          currentLocation
        );
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        setHasAutoFittedBounds(true);
      }
    };

    updateMarkers();
  }, [location, currentLocation, parkingSpots, gasStations, busStations, bicycleRoads, selectedSpot, selectedGasStation, mapInitialized, onMarkerClick, onGasStationClick, showGasStations, showBusStations, showBicycleRoads, currency, searchedLocation, hasAutoFittedBounds]);

  // Reset auto-fit flag when switching between different service types
  useEffect(() => {
    setHasAutoFittedBounds(false);
  }, [showGasStations, showBusStations, showBicycleRoads]);

  const renderMapContent = () => {
    if (mapLoadError && isOffline) {
      return (
        <div className="absolute inset-0 z-20 bg-gray-50 dark:bg-gray-900/90 p-4 flex flex-col items-center justify-center">
          <WifiOff className="h-12 w-12 text-yellow-500 mb-3" />
          <h3 className="text-lg font-semibold mb-2 text-center">Map Unavailable</h3>
          <p className="text-sm text-center mb-4 max-w-xs">
            The map can't be loaded because you're offline or tiles can't be loaded.
          </p>
          
          {parkingSpots.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md w-full max-w-md max-h-60 overflow-y-auto">
              <h4 className="font-medium mb-2">Nearby Parking Spots:</h4>
              <div className="space-y-2">
                {parkingSpots.map((spot) => (
                  <div 
                    key={spot.id}
                    onClick={() => onMarkerClick?.(spot)} 
                    className="p-2 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                  >
                    <div className="font-medium">{spot.name || "Parking Area"}</div>
                    {spot.distance && (
                      <div className="text-sm text-gray-500">{formatDistance(spot.distance)} away</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : location ? (
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md w-full max-w-md">
              <h4 className="font-medium mb-2">Your Parking Location:</h4>
              <div className="font-mono text-sm bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </div>
              {location.note && (
                <div className="mt-2 text-sm">
                  Note: {location.note}
                </div>
              )}
            </div>
          ) : null}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="relative w-full h-full">
      {isOffline && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-yellow-500/90 dark:bg-yellow-600/90 text-white text-center px-4 py-2 text-sm font-medium shadow-md flex items-center justify-center gap-2">
          <WifiOff className="h-4 w-4" />
          Offline Mode: Limited map functionality available
        </div>
      )}
      
      {clickMode === 'update' && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-center px-4 py-2 text-sm font-medium shadow-md">
          Click anywhere on the map to set your parking location
        </div>
      )}
    
      {!currentLocation && !location && !parkingSpots.length && !gasStations.length && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/70 bg-opacity-90 pointer-events-none">
          <MapPinIcon className="h-12 w-12 text-blue-500 mb-2 animate-bounce" />
          <p className="text-center text-gray-600 dark:text-gray-300 px-4 max-w-xs">
            Use the buttons above to find nearby parking spots or save your current location
          </p>
        </div>
      )}
      
      <div ref={mapContainerRef} className="w-full h-full min-h-[200px] sm:min-h-[400px] md:min-h-[500px] rounded-xl overflow-hidden shadow-xl" />
      
      {renderMapContent()}
      
      <div className="absolute bottom-0 right-0 bg-white/80 dark:bg-black/50 text-xs px-2 py-1 rounded-tl-md backdrop-blur-sm">
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
          OpenStreetMap Contributors
        </a>
      </div>
    </div>
  );
};

export default ParkingMap;

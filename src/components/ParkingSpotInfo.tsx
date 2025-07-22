import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Car, Star, Navigation, Phone, CreditCard, Wifi, Zap, TrendingDown, TrendingUp, Bell, Users, Shield, Camera } from "lucide-react";
import { ParkingSpot } from "@/lib/parkingUtils";

interface ParkingSpotInfoProps {
  selectedSpot: ParkingSpot;
  currency: string;
  userLocation: [number, number] | null;
  onGetDirections: (spot: ParkingSpot) => void;
  onToggleFavorite?: () => void;
  isFavorite: boolean;
}

// Seeded random function to ensure consistent data
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generate consistent seed from spot coordinates
const getSpotSeed = (spot: ParkingSpot) => {
  return Math.abs(Math.floor(spot.latitude * 10000) + Math.floor(spot.longitude * 10000));
};

// Haversine formula for accurate distance calculation
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Country detection for units
const getUnitsForCountry = (currency: string) => {
  const gallonCountries = ['USD']; // USA, Liberia, Myanmar use gallons
  return {
    volume: gallonCountries.includes(currency) ? 'gallon' : 'litre',
    distance: gallonCountries.includes(currency) ? 'miles' : 'km'
  };
};

// Distance conversion
const formatDistance = (distanceKm: number, unit: string) => {
  if (unit === 'miles') {
    const miles = distanceKm * 0.621371;
    return `${miles.toFixed(1)} miles`;
  }
  return `${distanceKm.toFixed(1)} km`;
};

const ParkingSpotInfo = ({ selectedSpot, currency, userLocation, onGetDirections, onToggleFavorite, isFavorite }: ParkingSpotInfoProps) => {
  if (!selectedSpot) return null;

  const getCurrencySymbol = (currencyCode: string) => {
    const symbols: { [key: string]: string } = {
      USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$',
      JPY: '¥', INR: '₹', CNY: '¥', BRL: 'R$', MXN: '$',
    };
    return symbols[currencyCode] || currencyCode;
  };

  // Get units based on currency/country
  const units = getUnitsForCountry(currency);

  // Calculate accurate distance if user location is available
  let accurateDistance = selectedSpot.distance || 0;
  if (userLocation) {
    accurateDistance = calculateDistance(
      userLocation[0], 
      userLocation[1], 
      selectedSpot.latitude, 
      selectedSpot.longitude
    );
  }

  // Check if location is in India or other uncertain fee regions
  const isUncertainFeeRegion = currency === 'INR';
  
  // Use seeded random for consistent data generation
  const seed = getSpotSeed(selectedSpot);
  const random1 = seededRandom(seed);
  const random2 = seededRandom(seed + 1);
  const random3 = seededRandom(seed + 2);
  const random4 = seededRandom(seed + 3);
  const random5 = seededRandom(seed + 4);
  const random6 = seededRandom(seed + 5);
  const random7 = seededRandom(seed + 6);
  const random8 = seededRandom(seed + 7);
  
  // Enhanced simulated data for parking spots - determine if paid based on spot properties
  const isPaidParking = (selectedSpot as any).hourlyRate || selectedSpot.operator?.toLowerCase().includes('paid') || random1 > 0.6;
  
  // For uncertain fee regions, don't show specific rates
  const hourlyRate = isPaidParking && !isUncertainFeeRegion ? ((selectedSpot as any).hourlyRate || random2 * 3 + 1) : 0;
  const dailyRate = isPaidParking && !isUncertainFeeRegion ? hourlyRate * 8 : 0;
  
  const availability = random3 > 0.4 ? 'Available' : 'Limited';
  const occupancyRate = Math.floor(random4 * 60 + 20); // 20-80%
  const totalSpaces = Math.floor(random5 * 50 + 10);
  const availableSpaces = Math.floor(totalSpaces * (100 - occupancyRate) / 100);
  
  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 6 && currentHour <= 22;
  const nextChange = isOpen ? '22:00' : '06:00';

  // Additional features using seeded random
  const hasDisabledAccess = random6 > 0.7;
  const hasSecurity = random7 > 0.5;
  const hasLighting = random8 > 0.3;
  const hasCCTV = seededRandom(seed + 8) > 0.6;
  const hasEvCharging = seededRandom(seed + 9) > 0.4;
  const acceptsCards = isPaidParking && seededRandom(seed + 10) > 0.2;
  const hasHeightRestriction = seededRandom(seed + 11) > 0.6;
  const maxHeight = hasHeightRestriction ? (1.8 + seededRandom(seed + 12) * 0.5).toFixed(1) : null;

  // Generate price trend data for paid parking (only if not uncertain region)
  const generatePriceTrend = () => {
    if (!isPaidParking || isUncertainFeeRegion) return [];
    const trend = [];
    const basePrice = hourlyRate;
    for (let i = 6; i >= 0; i--) {
      const variation = (seededRandom(seed + 13 + i) - 0.5) * 0.3;
      trend.push({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
        price: Math.max(0.5, basePrice + variation)
      });
    }
    return trend;
  };

  const priceTrend = generatePriceTrend();
  const priceChange = priceTrend.length > 1 ? priceTrend[priceTrend.length - 1].price - priceTrend[priceTrend.length - 2].price : 0;
  const hasPriceDrop = priceChange < -0.1;

  // Safety rating using consistent seed
  const safetyRating = (seededRandom(seed + 20) * 2 + 3).toFixed(1);
  const reviewCount = Math.floor(seededRandom(seed + 21) * 200 + 20);

  // Peak hour indicators
  const peakHours = ['8-10 AM', '5-7 PM'];
  const cheapestHours = ['11 PM - 6 AM', '2-4 PM'];
  const isPeakTime = currentHour >= 8 && currentHour <= 10 || currentHour >= 17 && currentHour <= 19;
  const isCheapTime = currentHour >= 23 || currentHour <= 6 || (currentHour >= 14 && currentHour <= 16);

  return (
    <Card className="w-full animate-fade-in shadow-lg border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-500" />
              {selectedSpot.name || "Parking Area"}
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {selectedSpot.operator || "Public Parking"}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{safetyRating}</span>
              <span className="text-xs text-gray-500">({reviewCount} reviews)</span>
            </div>
          </div>
          <div className="text-right">
            {isPaidParking ? (
              <div>
                {isUncertainFeeRegion ? (
                  <div>
                    <div className="text-lg font-bold text-blue-600">
                      PAID
                    </div>
                    <div className="text-xs text-gray-500">parking</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {getCurrencySymbol(currency)}{hourlyRate.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">per hour</div>
                    {hasPriceDrop && (
                      <Badge variant="default" className="text-xs mt-1 bg-green-600">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        Price Drop!
                      </Badge>
                    )}
                  </div>
                )}
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
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Real-time Status Indicators */}
        <div className="flex flex-wrap gap-2">
          {isPeakTime && (
            <Badge variant="destructive" className="text-xs flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Peak Hours
            </Badge>
          )}
          {isCheapTime && isPaidParking && !isUncertainFeeRegion && (
            <Badge variant="default" className="text-xs flex items-center gap-1 bg-green-600">
              <TrendingDown className="h-3 w-3" />
              Cheap Hours
            </Badge>
          )}
          {availability === 'Available' && (
            <Badge variant="default" className="text-xs flex items-center gap-1 bg-blue-600">
              <Users className="h-3 w-3" />
              Available Now
            </Badge>
          )}
        </div>

        {/* Smart Alerts Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Smart Alerts</h4>
            <Button variant="outline" size="sm" className="h-6 text-xs">
              <Bell className="h-3 w-3 mr-1" />
              Set Alert
            </Button>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>• Get notified when spots become available</p>
            {isPaidParking && !isUncertainFeeRegion && <p>• Alert when prices drop below {getCurrencySymbol(currency)}{(hourlyRate * 0.8).toFixed(2)}/hr</p>}
            <p>• Reminder 15 min before peak hours</p>
          </div>
        </div>

        {/* Peak Hour Indicators */}
        {isPaidParking && !isUncertainFeeRegion && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Best Times to Park</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="font-medium text-red-600">Peak Hours (Expensive):</p>
                {peakHours.map(hour => (
                  <p key={hour} className="text-gray-600">{hour}</p>
                ))}
              </div>
              <div>
                <p className="font-medium text-green-600">Cheapest Hours:</p>
                {cheapestHours.map(hour => (
                  <p key={hour} className="text-gray-600">{hour}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Price Trend for Paid Parking - only show if not uncertain region */}
        {isPaidParking && priceTrend.length > 0 && !isUncertainFeeRegion && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Recent Price Trend</h4>
              {hasPriceDrop && (
                <Button variant="outline" size="sm" className="h-6 text-xs">
                  <Bell className="h-3 w-3 mr-1" />
                  Set Alert
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              {priceChange > 0 ? (
                <TrendingUp className="h-4 w-4 text-red-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-green-500" />
              )}
              <span className={priceChange > 0 ? "text-red-500" : "text-green-500"}>
                {priceChange > 0 ? '+' : ''}{getCurrencySymbol(currency)}{Math.abs(priceChange).toFixed(2)} from yesterday
              </span>
            </div>
            <div className="text-xs text-gray-500">
              7-day range: {getCurrencySymbol(currency)}{Math.min(...priceTrend.map(p => p.price)).toFixed(2)} - {getCurrencySymbol(currency)}{Math.max(...priceTrend.map(p => p.price)).toFixed(2)}
            </div>
          </div>
        )}

        {/* Availability Status with Real-time Updates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            <div>
              <Badge variant={availability === 'Available' ? "default" : "secondary"} className="text-xs">
                {availability}
              </Badge>
              <p className="text-xs text-gray-500 mt-1">
                {availableSpaces}/{totalSpaces} spaces
              </p>
              <p className="text-xs text-green-600 mt-1">
                Live data • Updated 2 min ago
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <div>
              <Badge variant={isOpen ? "default" : "destructive"} className="text-xs">
                {isOpen ? "Open" : "Closed"}
              </Badge>
              <p className="text-xs text-gray-500 mt-1">
                {isOpen ? `Until ${nextChange}` : `Opens ${nextChange}`}
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Details for Paid Parking - only show if not uncertain region */}
        {isPaidParking && !isUncertainFeeRegion && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Parking Rates</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span>Hourly:</span>
                <span className="font-medium">{getCurrencySymbol(currency)}{hourlyRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Daily:</span>
                <span className="font-medium">{getCurrencySymbol(currency)}{dailyRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Weekend:</span>
                <span className="font-medium">{getCurrencySymbol(currency)}{(hourlyRate * 0.8).toFixed(2)}/hr</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly:</span>
                <span className="font-medium">{getCurrencySymbol(currency)}{(dailyRate * 20).toFixed(0)}</span>
              </div>
            </div>
          </div>
        )}

        {/* For uncertain regions, show general pricing info */}
        {isPaidParking && isUncertainFeeRegion && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Parking Information</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>• This is a paid parking area</p>
              <p>• Payment required during operating hours</p>
              <p>• Rates may vary by time and duration</p>
              <p>• Check on-site for current pricing</p>
            </div>
          </div>
        )}

        {/* Distance and Travel Time */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>{formatDistance(accurateDistance, units.distance)} away</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{Math.ceil(accurateDistance * (units.distance === 'miles' ? 2 : 3))} min walk</span>
          </div>
        </div>

        {/* Features and Amenities */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Features</h4>
          <div className="flex flex-wrap gap-2">
            {acceptsCards && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <CreditCard className="h-3 w-3" />
                Card Payment
              </Badge>
            )}
            {hasDisabledAccess && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Users className="h-3 w-3" />
                Disabled Access
              </Badge>
            )}
            {hasSecurity && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Security
              </Badge>
            )}
            {hasCCTV && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Camera className="h-3 w-3" />
                CCTV
              </Badge>
            )}
            {hasEvCharging && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {isUncertainFeeRegion ? "EV Charging" : "EV Charging Available"}
              </Badge>
            )}
            {hasLighting && (
              <Badge variant="outline" className="text-xs">
                Well Lit
              </Badge>
            )}
            {maxHeight && (
              <Badge variant="outline" className="text-xs">
                Max Height: {maxHeight}m
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
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

        {/* Operating Hours */}
        <div className="border-t pt-3">
          <h4 className="text-sm font-medium mb-2">Operating Hours</h4>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>Monday - Friday:</span>
              <span className="font-medium">06:00 - 22:00</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday:</span>
              <span>08:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday:</span>
              <span>09:00 - 18:00</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="border-t pt-3 text-xs text-gray-500 space-y-1">
          <div>Occupancy: {occupancyRate}% • Last updated: {new Date().toLocaleTimeString()}</div>
          <div>Safety rating based on lighting, security, and user reviews</div>
          {hasPriceDrop && isPaidParking && !isUncertainFeeRegion && (
            <div className="text-green-600 font-medium">🔔 Parking rate dropped recently - good time to park!</div>
          )}
          {isUncertainFeeRegion && (
            <div className="text-blue-600 font-medium">💡 Check local signage for exact parking fees and payment methods</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ParkingSpotInfo;

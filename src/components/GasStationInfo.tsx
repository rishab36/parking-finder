
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Fuel, Star, Navigation, Phone, CreditCard, Wifi, Car, Zap, TrendingDown, TrendingUp, Bell } from "lucide-react";

interface GasStation {
  id: string;
  name: string;
  address: string;
  price: number;
  distance: number;
  latitude: number;
  longitude: number;
}

interface GasStationInfoProps {
  selectedGasStation: GasStation | null;
  currency: string;
  userLocation: [number, number] | null;
  onGetDirections: (station: GasStation) => void;
}

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

const GasStationInfo = ({ selectedGasStation, currency, userLocation, onGetDirections }: GasStationInfoProps) => {
  if (!selectedGasStation) return null;

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
  let accurateDistance = selectedGasStation.distance;
  if (userLocation) {
    accurateDistance = calculateDistance(
      userLocation[0], 
      userLocation[1], 
      selectedGasStation.latitude, 
      selectedGasStation.longitude
    );
  }

  // Enhanced simulated data with more features
  const availability = Math.random() > 0.3 ? 'Available' : 'Busy';
  const waitTime = availability === 'Available' ? '0-2 min' : '5-10 min';
  const rating = (Math.random() * 2 + 3).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 500 + 50);
  
  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 6 && currentHour <= 22;
  const nextChange = isOpen ? '22:00' : '06:00';

  // Additional features
  const hasCarWash = Math.random() > 0.5;
  const hasRestroom = Math.random() > 0.3;
  const hasWifi = Math.random() > 0.4;
  const hasConvenienceStore = Math.random() > 0.6;
  const hasElectricCharging = Math.random() > 0.3;
  const acceptsCards = Math.random() > 0.2;

  // Fuel types
  const fuelTypes = ['Regular', 'Premium', 'Diesel'];
  if (hasElectricCharging) fuelTypes.push('Electric');

  // Pricing for different fuel types (adjusted for units)
  const regularPrice = selectedGasStation.price;
  const premiumPrice = regularPrice + (units.volume === 'gallon' ? 0.2 : 0.05);
  const dieselPrice = regularPrice - (units.volume === 'gallon' ? 0.1 : 0.03);

  // Generate price trend data (simulated)
  const generatePriceTrend = () => {
    const trend = [];
    const basePrice = regularPrice;
    for (let i = 6; i >= 0; i--) {
      const variation = (Math.random() - 0.5) * 0.1;
      trend.push({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
        price: Math.max(0.1, basePrice + variation)
      });
    }
    return trend;
  };

  const priceTrend = generatePriceTrend();
  const priceChange = priceTrend[priceTrend.length - 1].price - priceTrend[priceTrend.length - 2].price;
  const hasPriceDrop = priceChange < -0.02; // Significant drop

  return (
    <Card className="w-full animate-fade-in shadow-lg border-l-4 border-l-red-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Fuel className="h-5 w-5 text-red-500" />
              {selectedGasStation.name}
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {selectedGasStation.address}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-xs text-gray-500">({reviewCount} reviews)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              {getCurrencySymbol(currency)}{regularPrice.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">per {units.volume}</div>
            {hasPriceDrop && (
              <Badge variant="default" className="text-xs mt-1 bg-green-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                Price Drop!
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price Trend */}
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
              {priceChange > 0 ? '+' : ''}{getCurrencySymbol(currency)}{Math.abs(priceChange).toFixed(3)} from yesterday
            </span>
          </div>
          <div className="text-xs text-gray-500">
            7-day range: {getCurrencySymbol(currency)}{Math.min(...priceTrend.map(p => p.price)).toFixed(2)} - {getCurrencySymbol(currency)}{Math.max(...priceTrend.map(p => p.price)).toFixed(2)}
          </div>
        </div>

        {/* Status and Availability */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <div>
              <Badge variant={isOpen ? "default" : "destructive"} className="text-xs">
                {isOpen ? "Open" : "Closed"}
              </Badge>
              <p className="text-xs text-gray-500 mt-1">
                {isOpen ? `Closes at ${nextChange}` : `Opens at ${nextChange}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-orange-500" />
            <div>
              <Badge variant={availability === 'Available' ? "default" : "secondary"} className="text-xs">
                {availability}
              </Badge>
              <p className="text-xs text-gray-500 mt-1">Wait: {waitTime}</p>
            </div>
          </div>
        </div>

        {/* Fuel Prices */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Fuel Prices (per {units.volume})</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span>Regular:</span>
              <span className="font-medium">{getCurrencySymbol(currency)}{regularPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Premium:</span>
              <span className="font-medium">{getCurrencySymbol(currency)}{premiumPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Diesel:</span>
              <span className="font-medium">{getCurrencySymbol(currency)}{dieselPrice.toFixed(2)}</span>
            </div>
            {hasElectricCharging && (
              <div className="flex justify-between">
                <span>Electric:</span>
                <span className="font-medium">{getCurrencySymbol(currency)}{(regularPrice * 0.3).toFixed(2)}/kWh</span>
              </div>
            )}
          </div>
        </div>

        {/* Distance - Using accurate calculation */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>{formatDistance(accurateDistance, units.distance)} away</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{Math.ceil(accurateDistance * (units.distance === 'miles' ? 1.5 : 2))} min drive</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {acceptsCards && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <CreditCard className="h-3 w-3" />
                Cards Accepted
              </Badge>
            )}
            {hasWifi && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Wifi className="h-3 w-3" />
                Free WiFi
              </Badge>
            )}
            {hasCarWash && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Car className="h-3 w-3" />
                Car Wash
              </Badge>
            )}
            {hasElectricCharging && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Zap className="h-3 w-3" />
                EV Charging
              </Badge>
            )}
            {hasRestroom && (
              <Badge variant="outline" className="text-xs">
                Restroom
              </Badge>
            )}
            {hasConvenienceStore && (
              <Badge variant="outline" className="text-xs">
                Store
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={() => onGetDirections(selectedGasStation)}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Get Directions
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              const phone = `tel:+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
              window.open(phone);
            }}
            className="flex items-center gap-2"
          >
            <Phone className="h-4 w-4" />
            Call
          </Button>
        </div>

        {/* Hours Today */}
        <div className="border-t pt-3">
          <h4 className="text-sm font-medium mb-2">Hours</h4>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>Today:</span>
              <span className="font-medium">06:00 - 22:00</span>
            </div>
            <div className="flex justify-between">
              <span>Tomorrow:</span>
              <span>06:00 - 22:00</span>
            </div>
            <div className="flex justify-between">
              <span>Weekend:</span>
              <span>07:00 - 21:00</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="border-t pt-3 text-xs text-gray-500 space-y-1">
          <div>Last updated: {new Date().toLocaleDateString()}</div>
          <div>Price may vary • Amenities subject to availability</div>
          {hasPriceDrop && (
            <div className="text-green-600 font-medium">🔔 Price dropped recently - great time to fill up!</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GasStationInfo;


// Gas station utility functions for accurate calculations and country-specific formatting

export interface GasStation {
  id: string;
  name: string;
  address: string;
  price: number;
  distance: number;
  latitude: number;
  longitude: number;
}

// Haversine formula for accurate distance calculation
export const calculateAccurateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
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

// Generate mock gas stations with accurate distances
export const findNearbyGasStations = (
  userLat: number, 
  userLon: number, 
  currency: string = 'USD'
): GasStation[] => {
  const basePrice = getBasePriceForCurrency(currency);
  const stations = [
    { name: "Shell", lat: userLat + 0.01, lon: userLon + 0.01 },
    { name: "BP", lat: userLat - 0.005, lon: userLon + 0.015 },
    { name: "Exxon", lat: userLat + 0.008, lon: userLon - 0.012 },
    { name: "Chevron", lat: userLat - 0.015, lon: userLon - 0.008 },
    { name: "Texaco", lat: userLat + 0.02, lon: userLon + 0.005 },
    { name: "Mobil", lat: userLat - 0.008, lon: userLon + 0.022 }
  ];

  return stations.map((station, index) => {
    const distance = calculateAccurateDistance(userLat, userLon, station.lat, station.lon);
    const priceVariation = (Math.random() - 0.5) * 0.2;
    
    return {
      id: `gas-${index}`,
      name: station.name,
      address: `${Math.floor(Math.random() * 9999)} Main St`,
      price: Math.max(0.1, basePrice + priceVariation),
      distance: distance,
      latitude: station.lat,
      longitude: station.lon
    };
  });
};

// Get base price based on currency/country
const getBasePriceForCurrency = (currency: string): number => {
  const basePrices: { [key: string]: number } = {
    'USD': 3.45,    // USD per gallon
    'GBP': 1.42,    // GBP per litre
    'EUR': 1.55,    // EUR per litre
    'CAD': 1.85,    // CAD per litre
    'AUD': 1.65,    // AUD per litre
    'INR': 95.5,    // INR per litre
    'CNY': 7.2,     // CNY per litre
    'JPY': 155,     // JPY per litre
    'BRL': 6.8,     // BRL per litre
    'MXN': 22.5     // MXN per litre
  };
  
  return basePrices[currency] || basePrices['USD'];
};

// Price alert functionality
export const checkForPriceAlerts = (stations: GasStation[], currency: string) => {
  const alerts = [];
  const basePrice = getBasePriceForCurrency(currency);
  
  for (const station of stations) {
    if (station.price < basePrice * 0.95) { // 5% below average
      alerts.push({
        stationId: station.id,
        stationName: station.name,
        currentPrice: station.price,
        savings: basePrice - station.price,
        message: `Great price at ${station.name}! Save money on fuel.`
      });
    }
  }
  
  return alerts;
};

export default {
  calculateAccurateDistance,
  findNearbyGasStations,
  checkForPriceAlerts
};

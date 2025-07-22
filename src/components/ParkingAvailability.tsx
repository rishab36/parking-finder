
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

interface ParkingAvailabilityProps {
  spotName?: string;
  latitude?: number;
  longitude?: number;
  className?: string;
}

// Type for parking availability prediction
interface AvailabilityData {
  hour: number;
  day: number;  // 0 is Sunday, 1 is Monday, etc.
  percentage: number;
}

// Simulate data for parking availability throughout the week
const generateAvailabilityData = (
  latitude: number, 
  longitude: number, 
  spotName: string
): AvailabilityData[] => {
  const seed = (latitude * 10000 + longitude * 10000) % 100;
  const data: AvailabilityData[] = [];
  
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const isBusinessHour = hour >= 8 && hour <= 18;
      const isWeekend = day === 0 || day === 6;
      
      let baseAvailability = isBusinessHour ? 40 : 80;
      
      if (isWeekend && isBusinessHour) {
        baseAvailability = 30;
      } else if (isWeekend) {
        baseAvailability = 60;
      }
      
      if (hour === 9 || hour === 12 || hour === 17) {
        baseAvailability -= 20;
      }
      
      const randomFactor = Math.sin(seed + day * 24 + hour) * 15;
      const percentage = Math.min(Math.max(Math.round(baseAvailability + randomFactor), 0), 100);
      
      data.push({ hour, day, percentage });
    }
  }
  
  return data;
};

const ParkingAvailability: React.FC<ParkingAvailabilityProps> = ({ 
  spotName = 'Parking Area', 
  latitude = 0, 
  longitude = 0,
  className = '' 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData[]>([]);
  const [currentAvailability, setCurrentAvailability] = useState<AvailabilityData | null>(null);
  
  useEffect(() => {
    if (latitude && longitude) {
      const data = generateAvailabilityData(latitude, longitude, spotName);
      setAvailabilityData(data);
    }
  }, [spotName, latitude, longitude]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    if (availabilityData.length > 0) {
      const hour = currentTime.getHours();
      const day = currentTime.getDay();
      
      const availability = availabilityData.find(
        data => data.hour === hour && data.day === day
      );
      
      setCurrentAvailability(availability || null);
    }
  }, [availabilityData, currentTime]);
  
  const getAvailabilityColor = (percentage: number): string => {
    if (percentage >= 70) return 'bg-green-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getAvailabilityText = (percentage: number): string => {
    if (percentage >= 70) return 'Good availability';
    if (percentage >= 40) return 'Moderate availability';
    return 'Limited availability';
  };
  
  const generateHourlyForecast = () => {
    if (!currentAvailability) return [];
    
    const currentHour = currentTime.getHours();
    const currentDay = currentTime.getDay();
    
    const forecast = [];
    
    for (let i = 1; i <= 6; i++) {
      let forecastHour = (currentHour + i) % 24;
      let forecastDay = currentDay;
      
      if (currentHour + i >= 24) {
        forecastDay = (currentDay + 1) % 7;
      }
      
      const hourData = availabilityData.find(
        data => data.hour === forecastHour && data.day === forecastDay
      );
      
      if (hourData) {
        const timeString = forecastHour === 0 ? '12am' : 
                          forecastHour < 12 ? `${forecastHour}am` :
                          forecastHour === 12 ? '12pm' :
                          `${forecastHour - 12}pm`;
        
        forecast.push({
          time: timeString,
          percentage: hourData.percentage
        });
      }
    }
    
    return forecast;
  };
  
  if (!latitude || !longitude) {
    return null;
  }
  
  const hourlyForecast = generateHourlyForecast();
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-500" />
          Parking Availability
        </h3>
        <span className="text-sm text-gray-500">
          {format(currentTime, 'EEE, h:mm a')}
        </span>
      </div>
      
      {currentAvailability ? (
        <>
          <div className="flex items-center mb-4">
            <div className={`w-3 h-3 rounded-full mr-2 ${getAvailabilityColor(currentAvailability.percentage)}`}></div>
            <span className="font-medium">{getAvailabilityText(currentAvailability.percentage)}</span>
            <span className="ml-auto text-sm">{currentAvailability.percentage}% available</span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
            <div 
              className={`h-2.5 rounded-full ${getAvailabilityColor(currentAvailability.percentage)}`} 
              style={{ width: `${currentAvailability.percentage}%` }}
            ></div>
          </div>
          
          <h4 className="text-sm font-medium mb-3">Next 6 hours availability:</h4>
          <div className="grid grid-cols-6 gap-2">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{hour.time}</div>
                <div className={`w-full h-2 mx-auto rounded-full ${getAvailabilityColor(hour.percentage)}`}></div>
                <div className="text-xs mt-1 font-medium">{hour.percentage}%</div>
                <div className="text-xs text-gray-400">
                  {hour.percentage >= 70 ? 'Good' : hour.percentage >= 40 ? 'OK' : 'Busy'}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Good (70%+)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>OK (40-70%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Busy (0-40%)</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No availability data for this location
        </div>
      )}
      
      <p className="text-xs text-gray-500 mt-4">
        *Predictions based on typical patterns and may vary
      </p>
    </div>
  );
};

export default ParkingAvailability;

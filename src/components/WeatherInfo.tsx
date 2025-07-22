
import React, { useEffect, useState } from 'react';
import { CloudSun, Thermometer, Wind, Droplets, Eye, Sunrise, Sunset } from 'lucide-react';

interface WeatherInfoProps {
  latitude: number;
  longitude: number;
  className?: string;
}

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
  sunrise: number;
  sunset: number;
  pressure: number;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ latitude, longitude, className = '' }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!latitude || !longitude) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Using Open-Meteo API - completely free, no API key needed
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,visibility&daily=sunrise,sunset&timezone=auto`
        );
        
        if (!response.ok) {
          throw new Error('Weather API request failed');
        }
        
        const data = await response.json();
        
        // Map weather codes to conditions and icons
        const getWeatherInfo = (code: number) => {
          const weatherMap: { [key: number]: { condition: string; icon: string } } = {
            0: { condition: 'Clear sky', icon: '01d' },
            1: { condition: 'Mainly clear', icon: '01d' },
            2: { condition: 'Partly cloudy', icon: '02d' },
            3: { condition: 'Overcast', icon: '03d' },
            45: { condition: 'Foggy', icon: '50d' },
            48: { condition: 'Depositing rime fog', icon: '50d' },
            51: { condition: 'Light drizzle', icon: '09d' },
            53: { condition: 'Moderate drizzle', icon: '09d' },
            55: { condition: 'Dense drizzle', icon: '09d' },
            61: { condition: 'Slight rain', icon: '10d' },
            63: { condition: 'Moderate rain', icon: '10d' },
            65: { condition: 'Heavy rain', icon: '10d' },
            71: { condition: 'Slight snow', icon: '13d' },
            73: { condition: 'Moderate snow', icon: '13d' },
            75: { condition: 'Heavy snow', icon: '13d' },
            95: { condition: 'Thunderstorm', icon: '11d' },
          };
          
          return weatherMap[code] || { condition: 'Unknown', icon: '01d' };
        };
        
        const weatherInfo = getWeatherInfo(data.current.weather_code);
        
        setWeather({
          temperature: data.current.temperature_2m,
          condition: weatherInfo.condition,
          icon: weatherInfo.icon,
          humidity: data.current.relative_humidity_2m,
          windSpeed: data.current.wind_speed_10m,
          visibility: data.current.visibility / 1000, // Convert to km
          feelsLike: data.current.apparent_temperature,
          sunrise: new Date(data.daily.sunrise[0]).getTime(),
          sunset: new Date(data.daily.sunset[0]).getTime(),
          pressure: data.current.surface_pressure
        });
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Failed to fetch weather data');
        // Fallback to demo data
        setWeather({
          temperature: 22,
          condition: 'Partly Cloudy',
          icon: '02d',
          humidity: 65,
          windSpeed: 3.2,
          visibility: 10,
          feelsLike: 24,
          sunrise: Date.now() - 3600000,
          sunset: Date.now() + 7200000,
          pressure: 1013
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWeather();
  }, [latitude, longitude]);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getWeatherIcon = (iconCode: string) => {
    // Map to emoji icons since we're not using OpenWeatherMap icons
    const iconMap: { [key: string]: string } = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌦️', '09n': '🌦️',
      '10d': '🌧️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '🌨️', '13n': '🌨️',
      '50d': '🌫️', '50n': '🌫️'
    };
    
    return iconMap[iconCode] || '☀️';
  };

  if (isLoading) {
    return (
      <div className={`p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl shadow-lg ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full mr-4"></div>
            <div className="flex-1">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-20 mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-1"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return null;
  }

  return (
    <div className={`p-6 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 dark:from-blue-900/20 dark:via-sky-900/20 dark:to-cyan-900/20 rounded-xl shadow-lg backdrop-blur-sm ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <CloudSun className="h-6 w-6 mr-3 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">Today's Weather</h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">
          Current
        </span>
      </div>
      
      {/* Main Weather Display */}
      <div className="flex items-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 flex items-center justify-center text-5xl">
            {getWeatherIcon(weather.icon)}
          </div>
        </div>
        <div className="ml-4 flex-1">
          <div className="text-4xl font-bold text-gray-800 dark:text-gray-100 flex items-baseline">
            {Math.round(weather.temperature)}
            <span className="text-2xl ml-1 text-gray-600 dark:text-gray-300">°C</span>
          </div>
          <div className="text-lg capitalize text-gray-600 dark:text-gray-300 font-medium">
            {weather.condition}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Feels like {Math.round(weather.feelsLike)}°C
          </div>
        </div>
      </div>
      
      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white/40 dark:bg-gray-800/40 rounded-lg p-3 text-center backdrop-blur-sm">
          <Droplets className="h-5 w-5 mx-auto mb-2 text-blue-500" />
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">{weather.humidity}%</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Humidity</div>
        </div>
        
        <div className="bg-white/40 dark:bg-gray-800/40 rounded-lg p-3 text-center backdrop-blur-sm">
          <Wind className="h-5 w-5 mx-auto mb-2 text-green-500" />
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">{weather.windSpeed} m/s</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Wind Speed</div>
        </div>
        
        <div className="bg-white/40 dark:bg-gray-800/40 rounded-lg p-3 text-center backdrop-blur-sm">
          <Eye className="h-5 w-5 mx-auto mb-2 text-purple-500" />
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">{weather.visibility} km</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Visibility</div>
        </div>
        
        <div className="bg-white/40 dark:bg-gray-800/40 rounded-lg p-3 text-center backdrop-blur-sm">
          <Thermometer className="h-5 w-5 mx-auto mb-2 text-red-500" />
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">{weather.pressure} hPa</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Pressure</div>
        </div>
      </div>
      
      {/* Sun Times */}
      <div className="flex justify-between bg-white/30 dark:bg-gray-800/30 rounded-lg p-3 backdrop-blur-sm">
        <div className="flex items-center">
          <Sunrise className="h-4 w-4 mr-2 text-orange-500" />
          <div>
            <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{formatTime(weather.sunrise)}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Sunrise</div>
          </div>
        </div>
        <div className="flex items-center">
          <Sunset className="h-4 w-4 mr-2 text-orange-600" />
          <div>
            <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{formatTime(weather.sunset)}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Sunset</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;

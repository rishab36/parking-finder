
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Search, 
  Car, 
  Heart, 
  BarChart3, 
  Bell, 
  Navigation, 
  Clock,
  DollarSign,
  Star,
  Fuel,
  Bus,
  Bike
} from 'lucide-react';

const HowToUseGuide = () => {
  // Internal nav bar for SEO and navigation
  const navBar = (
    <nav className="flex flex-wrap gap-4 justify-center items-center mb-8 bg-blue-50 dark:bg-gray-900/30 p-4 rounded-xl shadow">
      <Link to="/sitemap" className="text-blue-700 hover:underline font-semibold">Sitemap</Link>
      <a href="/popular-locations.html" className="text-blue-700 hover:underline font-semibold">Popular Locations</a>
    </nav>
  );
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {navBar}
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Complete Parking Finder Guide - How to Find Parking Spots Near You
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Master the ultimate parking finder app for free parking spots, paid parking lots, 
          street parking, and nearby amenities. Find parking near me has never been easier!
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Badge variant="secondary">Free Parking Finder</Badge>
          <Badge variant="secondary">Street Parking Locator</Badge>
          <Badge variant="secondary">Parking Near Me</Badge>
          <Badge variant="secondary">Parking Spot Finder</Badge>
        </div>
      </div>

      {/* Quick Start Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-6 w-6 text-blue-600" />
            Quick Start: Find Parking Spots in 3 Easy Steps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Enable Location</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Allow location access to find parking spots near your current location using GPS parking finder technology.
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Search & Discover</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use our parking spot finder to search for free parking, paid parking lots, or street parking options.
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Navigate & Park</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get turn-by-turn directions to your chosen parking spot and start tracking your parking session.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-6 w-6 text-blue-600" />
            Complete Parking Solution Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Search className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Advanced Parking Search</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Find parking spots using our intelligent parking finder algorithm. Search for free parking near me, 
                    paid parking lots, street parking, and covered parking options with real-time availability.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Interactive Parking Map</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    View all parking spots on our comprehensive parking map. Our parking spot locator shows 
                    free parking areas, paid parking facilities, and street parking with pricing information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Favorite Parking Spots</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Save your preferred parking locations for quick access. Build your personal parking spot finder 
                    collection for work, shopping centers, and frequently visited places.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Parking Timer & Alerts</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Track your parking duration with our smart parking timer. Get parking expiry notifications 
                    to avoid parking tickets and overstay fees.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Parking Cost Calculator</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Calculate parking fees and compare parking prices across different parking lots. 
                    Find cheap parking options and track your parking expenses.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BarChart3 className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Parking Analytics</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Monitor your parking habits with detailed parking statistics. Track money saved, 
                    favorite parking locations, and parking frequency analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Step-by-Step Parking Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">How to Find Free Parking Near You</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Open the parking finder app and enable location services for accurate parking spot detection</li>
              <li>Use the search bar to find "free parking near me" or browse the interactive parking map</li>
              <li>Filter results to show only free parking spots and street parking options</li>
              <li>Select a parking spot and tap for detailed parking information including availability</li>
              <li>Get turn-by-turn navigation to your chosen free parking location</li>
              <li>Start parking timer when you arrive to track your parking session</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">How to Find Paid Parking Lots</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Search for "parking lots near me" or "paid parking" in the parking finder search</li>
              <li>Compare parking prices and amenities across different parking facilities</li>
              <li>Check parking lot reviews and ratings from other users</li>
              <li>Reserve parking spots in advance when available</li>
              <li>Navigate to your selected parking lot using GPS directions</li>
              <li>Use parking cost calculator to estimate total parking fees</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">Finding Nearby Amenities</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Fuel className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Gas stations near parking spots</span>
              </div>
              <div className="flex items-center gap-2">
                <Bus className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Public transportation access</span>
              </div>
              <div className="flex items-center gap-2">
                <Bike className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Bicycle parking and bike lanes</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            Pro Tips for Parking Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Maximize Your Parking Finder Experience</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Enable notifications for parking expiry alerts and meter reminders</li>
                <li>• Save frequently used parking spots to your favorites for quick access</li>
                <li>• Check parking regulations and time limits before parking</li>
                <li>• Use offline mode when signal is weak in parking garages</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Save Money on Parking</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Compare parking prices across multiple parking lots</li>
                <li>• Look for free parking spots during off-peak hours</li>
                <li>• Use early bird parking rates for all-day parking</li>
                <li>• Track parking expenses with our built-in analytics</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Footer */}
      <div className="text-center space-y-4 pt-8 border-t">
        <h2 className="text-2xl font-bold">Your Ultimate Parking Companion</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Whether you need a parking spot finder, free parking locator, or parking near me solution, 
          our comprehensive parking finder app provides everything you need for stress-free parking. 
          Find parking spots, compare parking prices, and navigate to your destination with confidence.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="outline">Parking Finder App</Badge>
          <Badge variant="outline">Find Parking Near Me</Badge>
          <Badge variant="outline">Free Parking Spots</Badge>
          <Badge variant="outline">Parking Lot Finder</Badge>
          <Badge variant="outline">Street Parking Locator</Badge>
        </div>
      </div>
    </div>
  );
};

export default HowToUseGuide;

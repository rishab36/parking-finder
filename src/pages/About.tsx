
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Users, Clock, Shield, Smartphone, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="sticky top-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b p-4 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGoBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Parking Finder
          </Button>
          <h1 className="text-xl font-semibold">About Parking Finder</h1>
        </div>
      </div>
      
      <nav className="flex flex-wrap gap-4 justify-center items-center mb-8 bg-blue-50 dark:bg-gray-900/30 p-4 rounded-xl shadow">
  <Link to="/services" className="text-blue-700 hover:underline font-semibold">Our Services</Link>
  <Link to="/about" className="text-blue-700 hover:underline font-semibold">About Us</Link>
  <Link to="/careers" className="text-blue-700 hover:underline font-semibold">Careers</Link>
  <Link to="/faq" className="text-blue-700 hover:underline font-semibold">FAQ</Link>
  <Link to="/blog" className="text-blue-700 hover:underline font-semibold">Blog</Link>
  <Link to="/pricing" className="text-blue-700 hover:underline font-semibold">Pricing</Link>
  <Link to="/sitemap" className="text-blue-700 hover:underline font-semibold">Sitemap</Link>
  <a href="/popular-locations.html" className="text-blue-700 hover:underline font-semibold">Popular Locations</a>
</nav>
<div className="py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              About Parking Finder - The Ultimate Parking Solution
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the world's most comprehensive parking finder app designed to eliminate parking stress and save time for millions of drivers across the globe.
            </p>
          </div>

          {/* What We Do */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border">
            <h2 className="text-3xl font-bold mb-6 text-center">What is Parking Finder?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Parking Finder is a revolutionary mobile and web application that helps drivers locate available parking spaces in real-time. Whether you're looking for free street parking, paid parking lots, garages, or specialized parking like airport and mall parking, our app provides instant results.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Using advanced GPS technology, live traffic data, and community-driven updates, we ensure you never waste time circling blocks looking for parking again.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">Real-time Parking</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Navigation className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">GPS Navigation</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">Time Saving</div>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <Shield className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">Secure & Free</div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">How Parking Finder Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border text-center">
                <Smartphone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">1. Open the App</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Launch the Parking Finder app on your phone or visit our website. Allow location access for the best experience.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border text-center">
                <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">2. Find Parking</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  View real-time parking availability on the map. Choose between free street parking or paid parking lots based on your needs.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border text-center">
                <Navigation className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">3. Navigate</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get turn-by-turn directions to your selected parking spot. Save time and reduce stress with accurate navigation.
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Parking Finder?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Comprehensive Coverage</h3>
                <ul className="space-y-2">
                  <li>• Street parking in urban areas</li>
                  <li>• Shopping mall parking lots</li>
                  <li>• Airport parking facilities</li>
                  <li>• Downtown garage parking</li>
                  <li>• Residential area parking</li>
                  <li>• Event venue parking</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Smart Features</h3>
                <ul className="space-y-2">
                  <li>• Real-time availability updates</li>
                  <li>• Parking cost calculator</li>
                  <li>• Favorite parking spots</li>
                  <li>• Offline map access</li>
                  <li>• Multi-language support</li>
                  <li>• Weather-aware suggestions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technology Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Powered by Advanced Technology</h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">GPS & Mapping Technology</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our app uses cutting-edge GPS technology and real-time mapping data to provide accurate parking information. We integrate with multiple data sources to ensure the most up-to-date parking availability.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Community-Driven Updates</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Users contribute to the accuracy of our parking database by reporting availability, pricing changes, and new parking spots, creating a constantly improving parking ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Global Reach */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Global Parking Solutions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From busy metropolitan cities to small towns, Parking Finder serves drivers worldwide with localized parking information, multi-currency support, and region-specific parking regulations and pricing.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border">
                <div className="text-2xl font-bold text-blue-600">Global</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Coverage</div>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Availability</div>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border">
                <div className="text-2xl font-bold text-purple-600">Free</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">To Use</div>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border">
                <div className="text-2xl font-bold text-orange-600">Smart</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Technology</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

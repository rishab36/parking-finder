
import React from 'react';
import { Mail, Globe, Shield, MapPin, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutTab = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:rishabrp2006@gmail.com';
  };

  const handleWebsiteClick = () => {
    window.open('https://www.parkingfinder.tech', '_blank', 'noopener,noreferrer');
  };

  const handlePrivacyClick = () => {
    window.open('https://glistening-bublanina-70d443.netlify.app/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* About Us Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative">
            <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <MapPin className="h-3 w-3 text-red-500 absolute -bottom-1 -right-1" />
          </div>
          <h3 className="text-lg font-semibold">About Parking Finder - Your Ultimate Parking Solution</h3>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
          <p>
            Parking Finder is the premier parking spot finder app designed to solve all your parking challenges. 
            Our comprehensive parking finder solution helps you discover free parking spots, paid parking lots, 
            and street parking options in real-time, making "find parking near me" searches effortless and efficient.
          </p>
          <p>
            As the leading parking locator app, we understand the frustration of searching for parking spots in busy urban areas. 
            Our intelligent parking finder technology provides real-time parking availability, parking spot pricing, 
            and nearby amenities to ensure you find the perfect parking solution every time you need to park.
          </p>
          <p>
            Whether you're looking for free parking near your destination, comparing parking lot prices, or need a reliable 
            parking spot finder for daily commuting, Parking Finder delivers comprehensive parking solutions. 
            Our parking finder app features location-based parking search, favorite parking spots, parking analytics insights, 
            and offline parking support to make your parking experience seamless and stress-free.
          </p>
          <p>
            With advanced parking finder algorithms, GPS parking navigation, parking timer functionality, and parking cost calculator, 
            we help you save time, money, and fuel while eliminating parking stress. Join millions of users who trust our 
            parking spot locator for their daily parking needs and discover why we're the #1 parking finder app.
          </p>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold">📬 Contact Our Parking Experts</h3>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Have questions about our parking finder features, need help finding parking spots, 
          or want to share feedback about your parking experience? Our parking specialists are here to help.
        </p>
        
        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={handleEmailClick}
            className="w-full justify-start"
          >
            <Mail className="h-4 w-4 mr-2" />
            rishabrp2006@gmail.com
          </Button>
          
          <Button
            variant="outline"
            onClick={handleWebsiteClick}
            className="w-full justify-start"
          >
            <Globe className="h-4 w-4 mr-2" />
            www.parkingfinder.tech
          </Button>
        </div>
      </div>

      {/* Privacy Policy Section */}
      <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold">Privacy & Security</h3>
        </div>
        
        <Button
          variant="outline"
          onClick={handlePrivacyClick}
          className="w-full justify-start"
        >
          <Shield className="h-4 w-4 mr-2" />
          Privacy Policy
        </Button>
        
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Your parking data privacy matters to us. Our comprehensive privacy policy details how we protect 
          your location information, parking history, and personal data while using our parking finder services.
        </p>
      </div>
    </div>
  );
};

export default AboutTab;

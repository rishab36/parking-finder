import React from "react";
import { MapPin, Shield, Star, Zap, Globe, Heart, Target, Mail, Info } from "lucide-react";
import { Link } from "react-router-dom";

const SeoFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-8 mb-4">
      {/* Page Links Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-4 p-4 rounded-lg bg-white/80 dark:bg-black/40 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
        <Link to="/our-mission" className="flex items-center text-sm text-gray-600 dark:text-gray-400 group hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Target className="h-4 w-4 mr-2 text-blue-600 group-hover:text-blue-500" />
          <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-medium">Our Mission</span>
        </Link>
        
        <div className="hidden sm:block h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
        
        <a 
          href="https://glistening-bublanina-70d443.netlify.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-sm text-gray-600 dark:text-gray-400 group hover:text-green-600 dark:hover:text-green-400 transition-colors"
        >
          <Shield className="h-4 w-4 mr-2 text-green-600 group-hover:text-green-500" />
          <span className="group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors font-medium">Privacy Policy</span>
        </a>
        
        <div className="hidden sm:block h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
        
        <Link to="/about" className="flex items-center text-sm text-gray-600 dark:text-gray-400 group hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
          <Info className="h-4 w-4 mr-2 text-purple-600 group-hover:text-purple-500" />
          <span className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-medium">About Us</span>
        </Link>
      </div>
      
      {/* Copyright and Contact */}
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
          <span>© {currentYear} Parking Finder</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Global Parking Solutions</span>
          <span className="hidden sm:inline">•</span>
          <a 
            href="https://glistening-bublanina-70d443.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors flex items-center gap-1"
          >
            <Shield className="h-3 w-3" />
            Privacy
          </a>
        </div>
        
        <div className="text-xs text-gray-400 dark:text-gray-500 max-w-2xl">
          Find parking spots near you instantly with our parking finder app. 
          Free parking locator with real-time availability, GPS navigation, and cost calculator. 
          The ultimate parking solution for smart cities worldwide.
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-1 mt-5">
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <Link to="/services" className="hover:text-blue-600">Services</Link>
          <span>•</span>
          <Link to="/pricing" className="hover:text-blue-600">Pricing</Link>
          <span>•</span>
          <Link to="/faq" className="hover:text-blue-600">FAQ</Link>
          <span>•</span>
          <Link to="/blog" className="hover:text-blue-600">Blog</Link>
          <span>•</span>
          <Link to="/careers" className="hover:text-blue-600">Careers</Link>
          <span>•</span>
          <Link to="/sitemap" className="hover:text-blue-600">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

export default SeoFooter;

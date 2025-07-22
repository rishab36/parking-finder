import React from "react";
import { Github, Info, Download, Apple, Play } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="mt-8 mb-4 text-center hidden lg:block">
      {/* App Download Links - Enhanced design */}
      <div className="relative mb-6 p-10 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 border border-blue-300/30 shadow-2xl backdrop-blur-lg overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-3xl"></div>
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-purple-300/10 rounded-full blur-lg"></div>
        
        <div className="relative z-10">
          {/* Header section */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-xl">
              <Download className="h-10 w-10 text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-black text-3xl text-white mb-2 tracking-tight">
                Download Our Mobile App
              </h3>
              <p className="text-lg text-blue-100 font-medium">
                Find parking spots instantly on your phone
              </p>
            </div>
          </div>
          
          {/* Download buttons */}
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://play.google.com/store/apps/details?id=co.median.android.ljwerj"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-green-500/30 min-w-[220px]"
            >
              <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                <Play className="h-7 w-7" />
              </div>
              <div className="text-left">
                <div className="text-xs opacity-90 font-medium">GET IT ON</div>
                <div className="text-xl font-black tracking-tight">Google Play</div>
              </div>
            </a>
            
            <a
              href="https://apps.apple.com/us/app/parkingfinder-tech/id6746726849"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-700/50 min-w-[220px]"
            >
              <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                <Apple className="h-7 w-7" />
              </div>
              <div className="text-left">
                <div className="text-xs opacity-90 font-medium">GET IT ON</div>
                <div className="text-xl font-black tracking-tight">App Store</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Navigation Links */}
      <div className="flex flex-col items-center justify-center gap-6 mb-6 p-6 rounded-2xl bg-white/80 dark:bg-black/40 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Services</h4>
            <a 
              href="/services" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Our Services
            </a>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Company</h4>
            <a 
              href="/about" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              About Us
            </a>
            <a 
              href="/careers" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Careers
            </a>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Resources</h4>
            <a 
              href="/blog" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Blog
            </a>
            <a 
              href="/faq" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              FAQ
            </a>
          </div>
        </div>
        
        {/* Secondary Navigation Links */}
        <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700 w-full">
          <a 
            href="/pricing" 
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
            Pricing
          </a>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
          <a 
            href="/sitemap" 
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Sitemap
        </a>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
        <a 
          href="/privacy-policy" 
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          Privacy Policy
        </a>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-2">
          <Info className="h-4 w-4" />
          © {currentYear} Parking Finder
        </p>
      </div>
    </div>
  );
};

export default Footer;


import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Database, Users, Globe } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-800">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          {/* Top Contact Us Button */}
          <div className="flex justify-between items-center mb-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-colors font-semibold text-base"
              style={{ letterSpacing: '0.5px' }}
            >
              <Lock className="h-4 w-4 text-white" />
              Contact Us
            </Link>
            {/* External Detailed Privacy Policy Link - prominent styling */}
            <a
              href="https://glistening-bublanina-70d443.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition-colors font-semibold text-base"
              style={{ letterSpacing: '0.5px' }}
            >
              <Shield className="h-4 w-4 text-white" />
              Detailed Privacy Policy
            </a>
          </div>
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Parking Finder
          </Link>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Your privacy matters to us. Learn how we protect your data while helping you find the best parking spots, gas stations, EV charging stations, and transportation options.
            </p>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="space-y-8">
          {/* Data Collection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                <strong>Location Data:</strong> We collect your GPS location to help you find nearby parking spots, gas stations, EV charging stations, bus stops, and cycling lanes. This data is used exclusively to provide accurate search results and navigation assistance.
              </p>
              <p>
                <strong>Search History:</strong> We store your parking searches, favorite locations, and preferred parking types (free parking, paid parking, street parking, garage parking) to improve your experience and provide personalized recommendations.
              </p>
              <p>
                <strong>Usage Analytics:</strong> We collect anonymous usage data about app features like parking timer, cost calculator, real-time availability checks, and offline map usage to improve our services.
              </p>
            </div>
          </div>

          {/* How We Use Data */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How We Use Your Information</h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <ul className="list-disc list-inside space-y-2">
                <li>Provide real-time parking availability and pricing information</li>
                <li>Show nearby gas stations with current fuel prices and amenities</li>
                <li>Display EV charging stations with connector types and charging speeds</li>
                <li>Locate public transportation options including bus stops and cycling lanes</li>
                <li>Offer turn-by-turn GPS navigation to your selected destination</li>
                <li>Calculate parking costs and compare pricing across different locations</li>
                <li>Send parking timer notifications and availability alerts</li>
                <li>Provide offline map functionality for areas with poor connectivity</li>
              </ul>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Data Security & Protection</h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                We implement industry-standard security measures to protect your personal information. All location data is encrypted during transmission and storage. We never sell your personal information to third parties.
              </p>
              <p>
                Your parking history, favorite spots, and search preferences are stored securely and can be deleted at any time through the app settings. We comply with GDPR, CCPA, and other international privacy regulations.
              </p>
            </div>
          </div>

          {/* Third-Party Services */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Third-Party Integrations</h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Our app integrates with various services to provide comprehensive information:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Google Maps for navigation and street view of parking locations</li>
                <li>Weather services for real-time weather conditions affecting parking</li>
                <li>Payment processors for paid parking transactions (when applicable)</li>
                <li>Public transportation APIs for bus and train schedule information</li>
                <li>EV charging network APIs for real-time charger availability</li>
                <li>Gas station price APIs for current fuel pricing data</li>
              </ul>
            </div>
          </div>

          {/* User Rights */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Your Rights & Controls</h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>You have complete control over your data:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access and download your parking history and saved locations</li>
                <li>Delete your account and all associated data at any time</li>
                <li>Opt out of location tracking (note: this may limit app functionality)</li>
                <li>Manage notification preferences for parking alerts and reminders</li>
                <li>Control data sharing settings for analytics and improvement purposes</li>
                <li>Request data portability to export your information</li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Questions About Privacy?</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or how we handle your data related to parking, gas stations, EV charging, or transportation services, please don't hesitate to contact us.
            </p>
            <p className="text-sm opacity-90">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Sitemap & Popular Locations Links */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            to="/sitemap"
            className="text-blue-600 underline hover:text-blue-800 text-sm"
          >
            Sitemap
          </Link>
          <Link
            to="https://parkingfinder.tech/oyo-hotel-green-view.html"
            className="text-blue-600 underline hover:text-blue-800 text-sm"
          >
            Popular Locations
          </Link>
        </div>

        {/* SEO Keywords Footer */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-center space-y-2">
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 flex-wrap justify-center">
              <span>🔒 Secure Parking App Privacy</span>
              <span>•</span>
              <span>🚗 Location Data Protection</span>
              <span>•</span>
              <span>⛽ Gas Station Privacy</span>
              <span>•</span>
              <span>🔌 EV Charging Data Security</span>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 flex-wrap justify-center">
              <span>🚌 Transit Privacy Policy</span>
              <span>•</span>
              <span>🚴 Cycling Data Protection</span>
              <span>•</span>
              <span>📍 GPS Privacy Rights</span>
              <span>•</span>
              <span>🛡️ GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Us Link at Bottom */}
      <div className="mt-8 text-center">
        <Link
          to="/contact"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

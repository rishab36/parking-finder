import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Users, Globe, Zap, Shield, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OurMission = () => {
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
          <h1 className="text-xl font-semibold">Our Mission & Vision</h1>
        </div>
      </div>
      
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Revolutionizing Urban Parking Solutions Worldwide
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're on a mission to eliminate parking stress and make urban mobility seamless for millions of drivers worldwide through innovative technology and real-time parking intelligence.
            </p>
          </div>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border">
              <Target className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Parking Discovery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Providing real-time parking availability, accurate pricing, and instant navigation to free and paid parking spots in every major city globally.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border">
              <Users className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Community-Driven</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Building the world's largest community of drivers sharing parking insights, tips, and real-time updates to help everyone find parking faster.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border">
              <Globe className="h-10 w-10 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Global Accessibility</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Making parking accessible to everyone, everywhere - from busy downtown areas to suburban shopping centers, airports, and tourist destinations worldwide.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border">
              <Zap className="h-10 w-10 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Delivering lightning-fast parking search results with GPS navigation, cost calculations, and availability updates in under 3 seconds.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border">
              <Shield className="h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Privacy Protection</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ensuring complete user privacy with encrypted data, no tracking, and secure location services that protect your personal information.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border">
              <Heart className="h-10 w-10 text-pink-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Stress-Free Experience</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eliminating parking anxiety and saving valuable time by providing reliable, accurate parking information before you even leave home.
              </p>
            </div>
          </div>

          {/* Vision Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4 text-center">Our Vision for the Future</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Smart City Integration</h3>
                <p className="mb-4">
                  We envision a future where our parking finder integrates with smart city infrastructure, traffic management systems, and urban planning to create seamless mobility experiences.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• AI-powered parking predictions</li>
                  <li>• Dynamic pricing optimization</li>
                  <li>• Traffic flow coordination</li>
                  <li>• Environmental impact reduction</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Global Parking Network</h3>
                <p className="mb-4">
                  Building the world's most comprehensive parking database covering every street, garage, lot, and space from major metropolitan areas to small towns.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• 1+ billion parking spots mapped</li>
                  <li>• 500+ cities worldwide</li>
                  <li>• Real-time availability tracking</li>
                  <li>• Multi-language support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              Our Core Values & Commitment
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Innovation & Technology</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Continuously advancing parking technology with machine learning, IoT sensors, computer vision, and predictive analytics to provide the most accurate parking information available.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Sustainability Focus</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Reducing carbon emissions by minimizing time spent searching for parking, promoting efficient space utilization, and supporting electric vehicle charging infrastructure.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">User-Centric Design</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every feature is designed with the user in mind - from intuitive interfaces to accessibility features, ensuring our app works for everyone regardless of technical expertise.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Data Accuracy</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Maintaining the highest standards of data quality through continuous verification, user feedback integration, and partnerships with parking authorities and municipalities.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Section */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-6">Our Impact So Far</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">6500+</div>
                <div className="text-gray-600 dark:text-gray-300">Cities Worldwide</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">50M+</div>
                <div className="text-gray-600 dark:text-gray-300">Parking Spaces Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">1M+</div>
                <div className="text-gray-600 dark:text-gray-300">Gas Stations Worldwide</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;

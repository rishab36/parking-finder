
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Search, Navigation, BatteryCharging, X } from "lucide-react";

interface WelcomeTutorialProps {
  onClose: () => void;
}

const WelcomeTutorial = ({ onClose }: WelcomeTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: MapPin,
      title: "Enable Location",
      description: "First, allow location access so we can find your current position and help you save parking spots.",
      color: "text-blue-600"
    },
    {
      icon: Search,
      title: "Find Nearby Parking",
      description: "Click the 'Nearby' button to discover available parking spots around your location.",
      color: "text-green-600"
    },
    {
      icon: Navigation,
      title: "Get Directions",
      description: "Select a parking spot and tap 'Get Directions' to navigate there using your preferred maps app.",
      color: "text-purple-600"
    },
    {
      icon: BatteryCharging,
      title: "Find EV Charging (Optional)",
      description: "If you drive an electric vehicle, use the EV button to find nearby charging stations.",
      color: "text-orange-600"
    }
  ];

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto animate-scale-in">
        <CardHeader className="relative">
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center justify-center mb-4">
            <div className={cn("p-3 rounded-full bg-gray-100 dark:bg-gray-800", currentStepData.color)}>
              <Icon className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-center">
            {currentStepData.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-600 dark:text-gray-400">
            {currentStepData.description}
          </p>
          
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentStep ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                )}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1"
            >
              Skip
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1"
            >
              {currentStep < steps.length - 1 ? "Next" : "Get Started"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default WelcomeTutorial;

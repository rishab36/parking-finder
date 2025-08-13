
import React from 'react';
import HowToUseGuide from '@/components/HowToUseGuide';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HowToUse = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b p-4 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGoBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to App
          </Button>
          <h1 className="text-xl font-semibold">Parking Finder - User Guide</h1>
        </div>
      </div>
      
      <div className="py-8">
        <HowToUseGuide />
      </div>
    </div>
  );
};

export default HowToUse;

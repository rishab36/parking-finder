
import React, { useEffect, useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useNotifications } from '@/hooks/useNotifications';
import InsightCard from './InsightCard';
import { ParkingInsight } from '@/types/analytics';
import { toast } from '@/hooks/use-toast';

interface AnalyticsInsightsProps {
  onPinLocation?: (location: any) => void;
}

const AnalyticsInsights = ({ onPinLocation }: AnalyticsInsightsProps) => {
  const { insights, markInsightsAsShown } = useAnalytics();
  const { addNotification } = useNotifications();
  const [visibleInsights, setVisibleInsights] = useState<ParkingInsight[]>([]);

  useEffect(() => {
    // Show new insights with a slight delay for better UX
    if (insights.length > 0) {
      setTimeout(() => {
        const newInsights = insights.slice(0, 2); // Show max 2 insights at once
        setVisibleInsights(newInsights);
        
        // Add insights to notifications after a delay (they'll be moved there after being shown)
        setTimeout(() => {
          newInsights.forEach(insight => addNotification(insight));
        }, 5000); // 5 seconds after they appear
      }, 1000);
    }
  }, [insights, addNotification]);

  const handleInsightAction = (insight: ParkingInsight) => {
    if (insight.type === 'location_frequency' && insight.actionData?.location && onPinLocation) {
      onPinLocation(insight.actionData.location);
      toast({
        title: "Location pinned!",
        description: "This location has been added to your favorites."
      });
    }
    
    // Mark as handled and add to notifications
    handleDismissInsight(insight.id);
  };

  const handleDismissInsight = (insightId: string) => {
    const dismissedInsight = visibleInsights.find(i => i.id === insightId);
    setVisibleInsights(prev => prev.filter(i => i.id !== insightId));
    markInsightsAsShown([insightId]);
    
    // Add to notifications when dismissed
    if (dismissedInsight) {
      addNotification(dismissedInsight);
    }
  };

  if (visibleInsights.length === 0) return null;

  return (
    <div className="space-y-3 mb-4">
      {visibleInsights.map(insight => (
        <InsightCard
          key={insight.id}
          insight={insight}
          onAction={handleInsightAction}
          onDismiss={handleDismissInsight}
        />
      ))}
    </div>
  );
};

export default AnalyticsInsights;

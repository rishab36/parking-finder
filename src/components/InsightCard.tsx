
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PiggyBank, Zap, MapPin, Trophy, DollarSign, X } from 'lucide-react';
import { ParkingInsight } from '@/types/analytics';

interface InsightCardProps {
  insight: ParkingInsight;
  onAction?: (insight: ParkingInsight) => void;
  onDismiss?: (insightId: string) => void;
}

const iconMap = {
  PiggyBank,
  Zap,
  MapPin,
  Trophy,
  DollarSign
};

const InsightCard = ({ insight, onAction, onDismiss }: InsightCardProps) => {
  const IconComponent = iconMap[insight.icon as keyof typeof iconMap] || MapPin;

  const getCardColor = () => {
    switch (insight.type) {
      case 'percentage':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'time_pattern':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      case 'location_frequency':
        return 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800';
      case 'cost_savings':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      default:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800';
    }
  };

  return (
    <Card className={`${getCardColor()} relative animate-fade-in`}>
      {onDismiss && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-6 w-6 p-0"
          onClick={() => onDismiss(insight.id)}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
      
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
            <IconComponent className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
              {insight.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {insight.description}
            </p>
            
            {insight.actionText && onAction && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => onAction(insight)}
              >
                {insight.actionText}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;

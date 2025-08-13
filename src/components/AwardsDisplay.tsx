
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';

interface AwardsDisplayProps {
  awards: Award[];
}

const AwardsDisplay = ({ awards }: AwardsDisplayProps) => {
  const getAwardColor = (type: Award['type']) => {
    switch (type) {
      case 'bronze':
        return 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-200';
      case 'silver':
        return 'bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-900/20 dark:border-gray-600 dark:text-gray-200';
      case 'gold':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-200';
      case 'platinum':
        return 'bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/20 dark:border-purple-700 dark:text-purple-200';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  if (awards.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        <span className="text-4xl mb-2 block">🏆</span>
        <p className="font-medium">No awards yet</p>
        <p className="text-xs">Start parking to unlock achievements!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        🏆 Your Awards ({awards.length})
      </h4>
      
      <div className="grid gap-2">
        {awards.map((award) => (
          <Card key={award.id} className={`${getAwardColor(award.type)} animate-fade-in`}>
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{award.icon}</div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-semibold text-sm">{award.title}</h5>
                    <Badge variant="outline" className="text-xs capitalize">
                      {award.type}
                    </Badge>
                  </div>
                  <p className="text-xs opacity-90 mb-1">{award.description}</p>
                  <p className="text-xs opacity-70">
                    Unlocked {formatDistanceToNow(new Date(award.unlockedAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AwardsDisplay;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Trash2, CheckCheck, Award as AwardIcon } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import InsightCard from './InsightCard';
import AwardsDisplay from './AwardsDisplay';
import { formatDistanceToNow } from 'date-fns';

const NotificationsTab = () => {
  const { 
    notifications, 
    awards,
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearNotifications,
    checkAndUnlockAwards,
    generateAnalyticsNotifications
  } = useNotifications();

  // Trigger analytics check when component mounts
  React.useEffect(() => {
    checkAndUnlockAwards();
    generateAnalyticsNotifications();
  }, []);

  if (notifications.length === 0 && awards.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </h3>
        </div>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No notifications yet</p>
          <p className="text-sm">Analytics insights and awards will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </h3>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              <CheckCheck className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={clearNotifications}
            className="text-xs"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            Alerts
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1 h-4 w-4 p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="awards" className="flex items-center gap-1">
            <AwardIcon className="h-4 w-4" />
            Awards
            {awards.length > 0 && (
              <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                {awards.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-3 max-h-96 overflow-y-auto mt-4">
          {notifications.length === 0 ? (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`relative ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg' : ''}`}
              >
                {!notification.read && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
                
                <InsightCard
                  insight={notification}
                  onDismiss={() => markAsRead(notification.id)}
                />
                
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 px-4">
                  {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="awards" className="max-h-96 overflow-y-auto mt-4">
          <AwardsDisplay awards={awards} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsTab;

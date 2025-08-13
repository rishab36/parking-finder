import { useState, useEffect } from 'react';
import { ParkingInsight } from '@/types/analytics';

export interface Notification extends ParkingInsight {
  timestamp: number;
  read: boolean;
}

export interface Award {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: number;
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const [awards, setAwards] = useState<Award[]>(() => {
    const saved = localStorage.getItem('user_awards');
    return saved ? JSON.parse(saved) : [];
  });

  const addNotification = (insight: ParkingInsight) => {
    const notification: Notification = {
      ...insight,
      timestamp: Date.now(),
      read: false
    };
    
    const updatedNotifications = [notification, ...notifications].slice(0, 50);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const addAward = (award: Award) => {
    if (awards.find(a => a.id === award.id)) return; // Don't add duplicate awards
    
    const updatedAwards = [award, ...awards];
    setAwards(updatedAwards);
    localStorage.setItem('user_awards', JSON.stringify(updatedAwards));
    
    // Add award as notification
    addNotification({
      id: `award_${award.id}`,
      type: 'location_frequency',
      title: `🏆 ${award.title}`,
      description: award.description,
      value: award.type,
      icon: 'Award'
    });
  };

  const checkAndUnlockAwards = () => {
    const sessions = JSON.parse(localStorage.getItem('parking_sessions') || '[]');
    const visits = JSON.parse(localStorage.getItem('location_visits') || '[]');
    
    // First parking session
    if (sessions.length === 1 && !awards.find(a => a.id === 'first_park')) {
      addAward({
        id: 'first_park',
        title: 'First Steps',
        description: 'Tracked your first parking session!',
        icon: '🚗',
        unlockedAt: Date.now(),
        type: 'bronze'
      });
    }

    // Eco warrior (5 free parking sessions)
    const freeSessions = sessions.filter((s: any) => s.type === 'free').length;
    if (freeSessions >= 5 && !awards.find(a => a.id === 'eco_warrior')) {
      addAward({
        id: 'eco_warrior',
        title: 'Eco Warrior',
        description: 'Found 5 free parking spots!',
        icon: '🌱',
        unlockedAt: Date.now(),
        type: 'silver'
      });
    }

    // Regular visitor (visit same location 5 times)
    const frequentLocation = visits.find((v: any) => v.visitCount >= 5);
    if (frequentLocation && !awards.find(a => a.id === 'regular_visitor')) {
      addAward({
        id: 'regular_visitor',
        title: 'Regular Visitor',
        description: 'Visited the same location 5 times!',
        icon: '📍',
        unlockedAt: Date.now(),
        type: 'gold'
      });
    }

    // Parking master (20+ total sessions)
    if (sessions.length >= 20 && !awards.find(a => a.id === 'parking_master')) {
      addAward({
        id: 'parking_master',
        title: 'Parking Master',
        description: 'Tracked 20 parking sessions!',
        icon: '👑',
        unlockedAt: Date.now(),
        type: 'platinum'
      });
    }
  };

  const generateAnalyticsNotifications = () => {
    const sessions = JSON.parse(localStorage.getItem('parking_sessions') || '[]');
    if (sessions.length < 3) return;

    const now = Date.now();
    const lastAnalyticsCheck = localStorage.getItem('last_analytics_check');
    const oneDay = 24 * 60 * 60 * 1000;

    // Only generate analytics once per day
    if (lastAnalyticsCheck && now - parseInt(lastAnalyticsCheck) < oneDay) {
      return;
    }

    // Weekly summary
    const weekAgo = now - (7 * oneDay);
    const weekSessions = sessions.filter((s: any) => new Date(s.startTime).getTime() > weekAgo);
    
    if (weekSessions.length > 0) {
      const freeCount = weekSessions.filter((s: any) => s.type === 'free').length;
      const freePercentage = Math.round((freeCount / weekSessions.length) * 100);
      
      addNotification({
        id: `weekly_summary_${now}`,
        type: 'percentage',
        title: 'Weekly Summary',
        description: `This week: ${weekSessions.length} parking sessions, ${freePercentage}% were free!`,
        value: freePercentage,
        icon: 'PiggyBank'
      });
    }

    // Money saved estimate
    const totalFree = sessions.filter((s: any) => s.type === 'free').length;
    const estimatedSavings = totalFree * 3.50; // Assume $3.50 average parking cost
    
    if (estimatedSavings > 0) {
      addNotification({
        id: `savings_update_${now}`,
        type: 'cost_savings',
        title: 'Money Saved',
        description: `You've saved approximately $${estimatedSavings.toFixed(2)} by choosing free parking!`,
        value: estimatedSavings,
        icon: 'DollarSign'
      });
    }

    localStorage.setItem('last_analytics_check', now.toString());
  };

  // Check for new awards and analytics on component mount and when data changes
  useEffect(() => {
    checkAndUnlockAwards();
    generateAnalyticsNotifications();
  }, []);

  const markAsRead = (notificationId: string) => {
    const updated = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('notifications');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    awards,
    unreadCount,
    addNotification,
    addAward,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    checkAndUnlockAwards,
    generateAnalyticsNotifications
  };
};

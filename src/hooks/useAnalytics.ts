import { useState, useEffect } from 'react';
import { ParkingSession, LocationVisit, ParkingInsight } from '@/types/analytics';
import { ParkingLocation } from '@/lib/parkingUtils';

const STORAGE_KEYS = {
  SESSIONS: 'parking_sessions',
  VISITS: 'location_visits',
  INSIGHTS_SHOWN: 'insights_shown'
};

export function useAnalytics() {
  const [sessions, setSessions] = useState<ParkingSession[]>([]);
  const [locationVisits, setLocationVisits] = useState<LocationVisit[]>([]);
  const [insights, setInsights] = useState<ParkingInsight[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    const savedVisits = localStorage.getItem(STORAGE_KEYS.VISITS);
    
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions).map((s: any) => ({
          ...s,
          startTime: new Date(s.startTime),
          endTime: s.endTime ? new Date(s.endTime) : undefined
        }));
        setSessions(parsedSessions);
      } catch (e) {
        console.error('Error loading sessions:', e);
      }
    }

    if (savedVisits) {
      try {
        const parsedVisits = JSON.parse(savedVisits).map((v: any) => ({
          ...v,
          lastVisit: new Date(v.lastVisit),
          firstVisit: new Date(v.firstVisit)
        }));
        setLocationVisits(parsedVisits);
      } catch (e) {
        console.error('Error loading visits:', e);
      }
    }
  }, []);

  // Save sessions to localStorage
  const saveSessions = (newSessions: ParkingSession[]) => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(newSessions));
    setSessions(newSessions);
  };

  // Save visits to localStorage
  const saveVisits = (newVisits: LocationVisit[]) => {
    localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(newVisits));
    setLocationVisits(newVisits);
  };

  // Track a new parking session
  const trackParkingSession = (location: ParkingLocation, type: 'free' | 'paid' | 'charging' = 'free', cost?: number) => {
    const sessionId = `session_${Date.now()}`;
    const newSession: ParkingSession = {
      id: sessionId,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        address: location.note
      },
      startTime: new Date(),
      type,
      cost,
      notes: location.note
    };

    const updatedSessions = [...sessions, newSession];
    saveSessions(updatedSessions);
    
    // Track location visit
    trackLocationVisit(location);
    
    return sessionId;
  };

  // Track location visits for frequency analysis
  const trackLocationVisit = (location: ParkingLocation) => {
    const locationId = `${location.latitude.toFixed(6)}_${location.longitude.toFixed(6)}`;
    const existingVisit = locationVisits.find(v => v.locationId === locationId);
    
    if (existingVisit) {
      const updatedVisits = locationVisits.map(v => 
        v.locationId === locationId 
          ? { ...v, visitCount: v.visitCount + 1, lastVisit: new Date() }
          : v
      );
      saveVisits(updatedVisits);
    } else {
      const newVisit: LocationVisit = {
        locationId,
        address: location.note || 'Unknown location',
        latitude: location.latitude,
        longitude: location.longitude,
        visitCount: 1,
        lastVisit: new Date(),
        firstVisit: new Date()
      };
      saveVisits([...locationVisits, newVisit]);
    }
  };

  // Generate insights based on data
  const generateInsights = (): ParkingInsight[] => {
    const insights: ParkingInsight[] = [];
    
    if (sessions.length >= 3) {
      // Free vs Paid parking percentage
      const freeCount = sessions.filter(s => s.type === 'free').length;
      const freePercentage = Math.round((freeCount / sessions.length) * 100);
      
      insights.push({
        id: 'free_percentage',
        type: 'percentage',
        title: 'Free Parking Champion',
        description: `You parked in free zones ${freePercentage}% of the time`,
        value: freePercentage,
        icon: 'PiggyBank'
      });

      // Time pattern analysis
      const chargingSessions = sessions.filter(s => s.type === 'charging');
      if (chargingSessions.length >= 2) {
        const hours = chargingSessions.map(s => s.startTime.getHours());
        const avgHour = Math.round(hours.reduce((a, b) => a + b, 0) / hours.length);
        const timeRange = `${avgHour}–${avgHour + 2}PM`;
        
        insights.push({
          id: 'charging_pattern',
          type: 'time_pattern',
          title: 'Charging Pattern',
          description: `You tend to use chargers between ${timeRange}`,
          value: timeRange,
          icon: 'Zap'
        });
      }

      // Cost savings insight (moved here to access freeCount)
      if (sessions.length >= 5) {
        const totalSaved = freeCount * 5; // Assume $5 average parking cost
        
        if (totalSaved > 0) {
          insights.push({
            id: 'cost_savings',
            type: 'cost_savings',
            title: 'Money Saved',
            description: `You've saved approximately $${totalSaved} by choosing free parking`,
            value: totalSaved,
            icon: 'DollarSign'
          });
        }
      }
    }

    // Location frequency insights
    const frequentLocations = locationVisits.filter(v => v.visitCount >= 3);
    frequentLocations.forEach(location => {
      if (location.visitCount === 10) {
        insights.push({
          id: `frequent_${location.locationId}`,
          type: 'location_frequency',
          title: 'Frequent Visitor',
          description: `This is your ${location.visitCount}th visit to ${location.address} — want to pin it?`,
          value: location.visitCount,
          icon: 'MapPin',
          actionText: 'Pin Location',
          actionData: { location }
        });
      } else if ([5, 15, 25].includes(location.visitCount)) {
        insights.push({
          id: `milestone_${location.locationId}_${location.visitCount}`,
          type: 'location_frequency',
          title: 'Location Milestone',
          description: `${location.visitCount} visits to ${location.address}! You really like this spot.`,
          value: location.visitCount,
          icon: 'Trophy'
        });
      }
    });

    return insights;
  };

  // Get new insights (ones not shown before)
  const getNewInsights = (): ParkingInsight[] => {
    const allInsights = generateInsights();
    const shownInsights = JSON.parse(localStorage.getItem(STORAGE_KEYS.INSIGHTS_SHOWN) || '[]');
    
    return allInsights.filter(insight => !shownInsights.includes(insight.id));
  };

  // Mark insights as shown
  const markInsightsAsShown = (insightIds: string[]) => {
    const shownInsights = JSON.parse(localStorage.getItem(STORAGE_KEYS.INSIGHTS_SHOWN) || '[]');
    const updatedShown = [...new Set([...shownInsights, ...insightIds])];
    localStorage.setItem(STORAGE_KEYS.INSIGHTS_SHOWN, JSON.stringify(updatedShown));
  };

  useEffect(() => {
    const newInsights = getNewInsights();
    setInsights(newInsights);
  }, [sessions, locationVisits]);

  return {
    sessions,
    locationVisits,
    insights,
    trackParkingSession,
    trackLocationVisit,
    generateInsights,
    getNewInsights,
    markInsightsAsShown
  };
}

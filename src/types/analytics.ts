
export interface ParkingSession {
  id: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  startTime: Date;
  endTime?: Date;
  type: 'free' | 'paid' | 'charging';
  cost?: number;
  notes?: string;
}

export interface LocationVisit {
  locationId: string;
  address: string;
  latitude: number;
  longitude: number;
  visitCount: number;
  lastVisit: Date;
  firstVisit: Date;
}

export interface ParkingInsight {
  id: string;
  type: 'percentage' | 'time_pattern' | 'location_frequency' | 'cost_savings';
  title: string;
  description: string;
  value: string | number;
  icon: string;
  actionText?: string;
  actionData?: any;
}

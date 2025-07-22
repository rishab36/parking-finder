
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export const useLocationPermission = () => {
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'prompt' | 'checking'>('checking');

  const checkLocationPermission = async () => {
    if (!navigator.geolocation) {
      setPermissionStatus('denied');
      return 'denied';
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
      setPermissionStatus(permission.state as 'granted' | 'denied' | 'prompt');
      return permission.state;
    } catch (error) {
      console.log('Permission API not supported, falling back to direct geolocation check');
      setPermissionStatus('prompt');
      return 'prompt';
    }
  };

  const requestLocationPermission = (): Promise<[number, number] | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        toast({
          title: "Location not supported",
          description: "Your browser doesn't support location services.",
          variant: "destructive"
        });
        setPermissionStatus('denied');
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPermissionStatus('granted');
          toast({
            title: "Location access granted",
            description: "Now finding parking spots near you!"
          });
          resolve([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          setPermissionStatus('denied');
          let message = "Please enable location services to find parking near you.";
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = "Location access denied. Please enable location in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              message = "Location information unavailable. Please try again.";
              break;
            case error.TIMEOUT:
              message = "Location request timed out. Please try again.";
              break;
          }
          
          toast({
            title: "Location access required",
            description: message,
            variant: "destructive"
          });
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  };

  useEffect(() => {
    checkLocationPermission();
  }, []);

  return {
    permissionStatus,
    checkLocationPermission,
    requestLocationPermission
  };
};

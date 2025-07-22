
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f64c07d2e48f4e5eb6bda52bfcbb98d7',
  appName: 'Park Finder',
  webDir: 'dist',
  server: {
    url: 'https://f64c07d2-e48f-4e5e-b6bd-a52bfcbb98d7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3B82F6",
      showSpinner: true,
      spinnerColor: "#ffffff",
      androidSpinnerStyle: "large"
    },
    Geolocation: {
      androidGPSPermission: true
    },
    LocalNotifications: {
      smallIcon: "ic_stat_parking",
      iconColor: "#3B82F6",
      sound: "beep.wav"
    }
  },
  android: {
    allowMixedContent: true
  },
  ios: {
    contentInset: "always"
  }
};

export default config;

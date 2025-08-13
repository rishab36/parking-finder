
import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export function useTimeBasedTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Always use time-based theme
    const hour = new Date().getHours();
    return (hour >= 6 && hour < 18) ? "light" : "dark";
  });

  // Effect to manage theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove old theme
    root.classList.remove("light", "dark");
    
    // Add new theme
    root.classList.add(theme);
  }, [theme]);

  // Check time every minute and update theme automatically
  useEffect(() => {
    const interval = setInterval(() => {
      const hour = new Date().getHours();
      const timeBasedTheme = (hour >= 6 && hour < 18) ? "light" : "dark";
      setTheme(timeBasedTheme);
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);
  
  return { theme };
}

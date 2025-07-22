
import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    
    // Check system preference if no saved theme
    if (!savedTheme) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    }
    
    return savedTheme || "light";
  });

  // Effect to manage theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove old theme
    root.classList.remove("light", "dark");
    
    // Add new theme
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  
  return { theme, toggleTheme, setTheme };
}

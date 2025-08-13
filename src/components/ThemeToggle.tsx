
import { useTimeBasedTheme } from "@/hooks/useTimeBasedTheme";

const ThemeToggle = () => {
  // Just initialize the theme hook but don't render anything
  useTimeBasedTheme();
  return null;
};

export default ThemeToggle;

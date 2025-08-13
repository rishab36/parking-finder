
import { MapPin, Car } from "lucide-react";

interface HeaderProps {
  title?: string;
}

const Header = ({ title = "Parking Finder" }: HeaderProps) => {
  return (
    <header className="relative flex flex-row items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 dark:from-blue-800 dark:via-blue-700 dark:to-blue-800 shadow-lg transition-all duration-300">
      <div className="relative">
        <Car className="h-6 w-6 text-white animate-pulse" />
        <MapPin className="h-3 w-3 text-red-400 absolute -bottom-1 -right-1 animate-bounce" />
      </div>
      <h1 className="text-xl md:text-2xl font-bold text-white">
        {title}
      </h1>
      
      <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
    </header>
  );
};

export default Header;

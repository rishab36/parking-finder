
import React from "react";
import { Star } from "lucide-react";
import { FavoriteSpot } from "@/hooks/useParking";
import { formatDistanceToNow } from 'date-fns';

interface FavoritesListProps {
  favorites: FavoriteSpot[];
  onSelect: (spot: FavoriteSpot) => void;
  className?: string;
}

const FavoritesList = ({ favorites, onSelect, className = "" }: FavoritesListProps) => {
  if (favorites.length === 0) return null;

  return (
    <div className={`${className}`}>
      <h2 className="font-semibold text-lg mb-2 flex items-center">
        <Star className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-400" />
        Favorite Spots
      </h2>
      
      <div className="overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex gap-3">
          {favorites.map((favorite) => (
            <button
              key={favorite.id}
              onClick={() => onSelect(favorite)}
              className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-lg p-3 border border-yellow-200 dark:border-yellow-900/30 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in group"
            >
              <div className="flex items-center mb-1">
                <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-400 group-hover:animate-pulse" />
                <h3 className="font-medium text-sm truncate max-w-[100px]">{favorite.name}</h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Saved {formatDistanceToNow(favorite.timestamp, { addSuffix: true })}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;

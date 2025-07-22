import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, Clock, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchSuggestion {
  id: string;
  display_name: string;
  type: 'place' | 'recent';
  lat?: number;
  lon?: number;
}

interface SearchWithSuggestionsProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  onClose?: () => void;
  className?: string;
  autoFocus?: boolean;
}

const SearchWithSuggestions = ({
  placeholder = "Search for a location...",
  value,
  onChange,
  onSearch,
  onClose,
  className,
  autoFocus = false
}: SearchWithSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch suggestions from Nominatim API
  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      
      const placeSuggestions: SearchSuggestion[] = data.map((item: any, index: number) => ({
        id: `place-${index}`,
        display_name: item.display_name,
        type: 'place' as const,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon)
      }));

      // Add recent searches that match the query - limit to 2 items
      const matchingRecent: SearchSuggestion[] = recentSearches
        .filter(recent => recent.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 2)
        .map((recent, index) => ({
          id: `recent-${index}`,
          display_name: recent,
          type: 'recent' as const
        }));

      const allSuggestions = [...matchingRecent, ...placeSuggestions.slice(0, 5 - matchingRecent.length)];
      setSuggestions(allSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value && showSuggestions) {
        fetchSuggestions(value);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value, showSuggestions]);

  // Show recent searches when input is focused and empty - limit to 3 items
  useEffect(() => {
    if (showSuggestions && !value && recentSearches.length > 0) {
      const recentSuggestions: SearchSuggestion[] = recentSearches.slice(0, 3).map((recent, index) => ({
        id: `recent-${index}`,
        display_name: recent,
        type: 'recent' as const
      }));
      setSuggestions(recentSuggestions);
    }
  }, [showSuggestions, value, recentSearches]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onChange(suggestion.display_name);
    setShowSuggestions(false);
    addToRecentSearches(suggestion.display_name);
    onSearch(suggestion.display_name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      setShowSuggestions(false);
      addToRecentSearches(value);
      onSearch(value);
    }
  };

  const addToRecentSearches = (query: string) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      const updatedSearches = [
        trimmedQuery,
        ...recentSearches.filter(item => item !== trimmedQuery)
      ].slice(0, 5); // Limit to 5 total stored searches
      
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleClearInput = () => {
    onChange("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-20"
          autoFocus={autoFocus}
        />
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex gap-1">
          {value && (
            <button
              type="button"
              onClick={handleClearInput}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <Button type="submit" size="sm" className="h-8 px-3">
            Search
          </Button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown - Fixed z-index issue */}
      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 z-[9999] mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-64 overflow-y-auto">
          {isLoading && (
            <div className="p-3 text-center text-gray-500">
              <Search className="h-4 w-4 animate-spin mx-auto mb-1" />
              <span className="text-sm">Searching...</span>
            </div>
          )}
          
          {!isLoading && suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={cn(
                "w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0",
                selectedIndex === index && "bg-gray-100 dark:bg-gray-700"
              )}
            >
              {suggestion.type === 'recent' ? (
                <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
              ) : (
                <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {suggestion.display_name}
                </div>
                {suggestion.type === 'recent' && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">Recent search</div>
                )}
              </div>
            </button>
          ))}
          
          {!isLoading && suggestions.length === 0 && value.length >= 2 && (
            <div className="p-3 text-center text-gray-500">
              <span className="text-sm">No suggestions found</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchWithSuggestions;

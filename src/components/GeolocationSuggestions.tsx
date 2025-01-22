import React, { useEffect, useState } from 'react';
import { MapPin, Globe } from 'lucide-react';
import { GeolocationSuggestion } from '../types';

interface GeolocationSuggestionsProps {
  onLanguageSelect: (code: string) => void;
}

export const GeolocationSuggestions: React.FC<GeolocationSuggestionsProps> = ({
  onLanguageSelect,
}) => {
  const [suggestions, setSuggestions] = useState<GeolocationSuggestion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In production, make API call with coordinates
          setLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLoading(false);
        }
      );
    }
  }, []);

  return (
    <div className="bg-navy-50 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-navy-600" />
        <h3 className="text-lg font-semibold text-navy-900">Local Languages</h3>
      </div>

      {loading ? (
        <div className="animate-pulse flex items-center gap-2">
          <Globe className="w-5 h-5 text-navy-400" />
          <span>Detecting location...</span>
        </div>
      ) : suggestions?.suggestedLanguages ? (
        <div className="space-y-2">
          {suggestions.suggestedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageSelect(lang.code)}
              className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-navy-100 transition-colors"
            >
              <span>{lang.name}</span>
              <span className="text-sm text-navy-500">
                {Math.round(lang.confidence * 100)}%
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-navy-600">No language suggestions available</p>
      )}
    </div>
  );
};
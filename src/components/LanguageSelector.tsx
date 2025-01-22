import React from 'react';
import { LANGUAGES } from '../constants/languages';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  className = '',
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg 
        focus:ring-navy-500 focus:border-navy-500 block p-2.5 ${className}`}
    >
      {Object.entries(LANGUAGES).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
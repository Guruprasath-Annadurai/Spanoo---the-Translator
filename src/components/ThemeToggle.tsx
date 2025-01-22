import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onChange: (isDark: boolean) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onChange }) => {
  return (
    <button
      onClick={() => onChange(!isDark)}
      className={`p-2 rounded-full transition-colors ${
        isDark ? 'bg-navy-700 text-white' : 'bg-navy-100 text-navy-900'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};
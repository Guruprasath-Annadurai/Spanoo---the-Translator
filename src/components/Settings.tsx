import React from 'react';
import { Settings as SettingsIcon, Shield, Smartphone, Eye, Globe, Clock } from 'lucide-react';
import { UserPreferences } from '../types';

interface SettingsProps {
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
}

export const Settings: React.FC<SettingsProps> = ({ preferences, onPreferencesChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          <span>End-to-End Encryption</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.encryptData}
            onChange={(e) => onPreferencesChange({
              ...preferences,
              encryptData: e.target.checked
            })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-navy-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy-600"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span>Auto-Delete after 30 days</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.autoDeleteDays === 30}
            onChange={(e) => onPreferencesChange({
              ...preferences,
              autoDeleteDays: e.target.checked ? 30 : 0
            })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-navy-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy-600"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5" />
          <span>Smartwatch Compatibility</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.watchCompatibility}
            onChange={(e) => onPreferencesChange({
              ...preferences,
              watchCompatibility: e.target.checked
            })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-navy-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy-600"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          <span>Visual Assistance</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.visualAssistance}
            onChange={(e) => onPreferencesChange({
              ...preferences,
              visualAssistance: e.target.checked
            })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-navy-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy-600"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          <span>Data Localization</span>
        </div>
        <select
          value={preferences.dataLocalization}
          onChange={(e) => onPreferencesChange({
            ...preferences,
            dataLocalization: e.target.value
          })}
          className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-navy-500 focus:border-navy-500 block p-2.5"
        >
          <option value="us">United States</option>
          <option value="eu">European Union</option>
          <option value="asia">Asia Pacific</option>
        </select>
      </div>
    </div>
  );
};
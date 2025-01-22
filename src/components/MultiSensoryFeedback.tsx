import React, { useState } from 'react';
import { Vibrate, Volume2, Lightbulb } from 'lucide-react';

interface MultiSensoryFeedbackProps {
  hapticEnabled: boolean;
  audioEnabled: boolean;
  visualEnabled: boolean;
  onToggle: (type: 'haptic' | 'audio' | 'visual') => void;
}

export const MultiSensoryFeedback: React.FC<MultiSensoryFeedbackProps> = ({
  hapticEnabled,
  audioEnabled,
  visualEnabled,
  onToggle,
}) => {
  return (
    <div className="bg-navy-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-navy-900 mb-4">Sensory Feedback</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
          <div className="flex items-center gap-2">
            <Vibrate className="w-5 h-5 text-navy-600" />
            <span>Haptic Feedback</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={hapticEnabled}
              onChange={() => onToggle('haptic')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-navy-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-navy-600" />
            <span>Audio Feedback</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={audioEnabled}
              onChange={() => onToggle('audio')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-navy-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-navy-600" />
            <span>Visual Feedback</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={visualEnabled}
              onChange={() => onToggle('visual')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-navy-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};
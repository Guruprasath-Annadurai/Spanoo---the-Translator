import React, { useState } from 'react';
import { AlertTriangle, Phone, MessageSquare } from 'lucide-react';
import { EmergencyPhrase } from '../types';

interface EmergencyAssistanceProps {
  active: boolean;
  onTranslate: (phrase: string) => Promise<string>;
}

export const EmergencyAssistance: React.FC<EmergencyAssistanceProps> = ({
  active,
  onTranslate,
}) => {
  const [translatedPhrases, setTranslatedPhrases] = useState<Record<string, string>>({});

  const emergencyPhrases: EmergencyPhrase[] = [
    { phrase: "I need medical help", category: "medical", priority: 1 },
    { phrase: "Call an ambulance", category: "medical", priority: 1 },
    { phrase: "I need police assistance", category: "safety", priority: 1 },
    { phrase: "I'm lost", category: "assistance", priority: 2 },
    { phrase: "I need help", category: "assistance", priority: 1 },
  ];

  const translatePhrase = async (phrase: string) => {
    const translated = await onTranslate(phrase);
    setTranslatedPhrases(prev => ({
      ...prev,
      [phrase]: translated
    }));
  };

  if (!active) return null;

  return (
    <div className="fixed inset-0 bg-red-50 bg-opacity-95 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
          <h2 className="text-2xl font-bold text-red-700">Emergency Assistance</h2>
        </div>

        <div className="space-y-4">
          {emergencyPhrases
            .sort((a, b) => a.priority - b.priority)
            .map((emergency) => (
              <div
                key={emergency.phrase}
                className="p-4 bg-red-50 rounded-lg border border-red-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{emergency.phrase}</p>
                    {translatedPhrases[emergency.phrase] && (
                      <p className="text-gray-600 mt-1">
                        {translatedPhrases[emergency.phrase]}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => translatePhrase(emergency.phrase)}
                      className="p-2 text-navy-600 hover:bg-red-100 rounded-full"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { UserCircle, Plus, Settings, Trash } from 'lucide-react';
import { UserPersona } from '../types';

interface UserPersonaManagerProps {
  personas: UserPersona[];
  activePersona: string | null;
  onSelectPersona: (id: string) => void;
  onCreatePersona: (persona: Omit<UserPersona, 'id'>) => void;
  onDeletePersona: (id: string) => void;
}

export const UserPersonaManager: React.FC<UserPersonaManagerProps> = ({
  personas,
  activePersona,
  onSelectPersona,
  onCreatePersona,
  onDeletePersona,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newPersonaName, setNewPersonaName] = useState('');

  const handleCreate = () => {
    if (newPersonaName) {
      onCreatePersona({
        name: newPersonaName,
        preferences: {
          theme: 'light',
          autoDeleteDays: 30,
          dataLocalization: 'us',
          visualAssistance: false,
          encryptData: true,
          watchCompatibility: false,
          learningMode: true,
          emotionRecognition: false,
          pronunciationTrainer: true,
          customDictionary: true,
          highContrast: false,
          fontSize: 'medium',
          hearingAidMode: false,
          gestureControl: false,
          handsFreeMode: false,
          emergencyMode: false,
          signLanguageDetection: false,
          multiSensoryFeedback: true,
          voiceReplay: true,
          dynamicText: false,
          externalDevices: false,
          faceGestureRecognition: false,
        },
        commonPhrases: [],
        favoriteLanguages: [],
        accessibilityNeeds: [],
        lastUsed: new Date(),
      });
      setNewPersonaName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-navy-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <UserCircle className="w-5 h-5 text-navy-600" />
          <h3 className="text-lg font-semibold text-navy-900">User Personas</h3>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="p-2 hover:bg-navy-100 rounded-full transition-colors"
        >
          <Plus className="w-5 h-5 text-navy-600" />
        </button>
      </div>

      {isCreating && (
        <div className="mb-4 p-4 bg-white rounded-lg">
          <input
            type="text"
            value={newPersonaName}
            onChange={(e) => setNewPersonaName(e.target.value)}
            placeholder="Persona name"
            className="w-full p-2 border border-navy-200 rounded-lg mb-2"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsCreating(false)}
              className="px-3 py-1 text-navy-600 hover:bg-navy-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!newPersonaName}
              className="px-3 py-1 bg-navy-500 text-white rounded-lg disabled:opacity-50"
            >
              Create
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {personas.map((persona) => (
          <div
            key={persona.id}
            className={`flex items-center justify-between p-3 rounded-lg ${
              activePersona === persona.id
                ? 'bg-navy-500 text-white'
                : 'bg-white hover:bg-navy-100'
            }`}
          >
            <button
              onClick={() => onSelectPersona(persona.id)}
              className="flex items-center gap-2"
            >
              <UserCircle className="w-5 h-5" />
              <span>{persona.name}</span>
            </button>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-navy-200 rounded-full">
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeletePersona(persona.id)}
                className="p-1 hover:bg-red-100 rounded-full"
              >
                <Trash className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
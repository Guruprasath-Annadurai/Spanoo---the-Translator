import React, { useState } from 'react';
import { Book, Plus, Trash } from 'lucide-react';
import { CustomDictionaryEntry } from '../types';

interface CustomDictionaryProps {
  entries: CustomDictionaryEntry[];
  onAddEntry: (entry: CustomDictionaryEntry) => void;
  onRemoveEntry: (term: string) => void;
}

export const CustomDictionary: React.FC<CustomDictionaryProps> = ({
  entries,
  onAddEntry,
  onRemoveEntry,
}) => {
  const [newTerm, setNewTerm] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [newContext, setNewContext] = useState('');

  const handleAdd = () => {
    if (newTerm && newTranslation) {
      onAddEntry({
        term: newTerm,
        translation: newTranslation,
        context: newContext,
        lastUsed: new Date(),
      });
      setNewTerm('');
      setNewTranslation('');
      setNewContext('');
    }
  };

  return (
    <div className="bg-navy-50 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Book className="w-5 h-5 text-navy-600" />
        <h3 className="text-lg font-semibold text-navy-900">Custom Dictionary</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newTerm}
            onChange={(e) => setNewTerm(e.target.value)}
            placeholder="Term"
            className="p-2 rounded-lg border border-navy-200 focus:ring-2 focus:ring-navy-500"
          />
          <input
            type="text"
            value={newTranslation}
            onChange={(e) => setNewTranslation(e.target.value)}
            placeholder="Translation"
            className="p-2 rounded-lg border border-navy-200 focus:ring-2 focus:ring-navy-500"
          />
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 bg-navy-500 text-white p-2 rounded-lg hover:bg-navy-600"
          >
            <Plus className="w-4 h-4" />
            Add Entry
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {entries.map((entry) => (
            <div
              key={entry.term}
              className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{entry.term}</span>
                  <span className="text-gray-400">→</span>
                  <span>{entry.translation}</span>
                </div>
                {entry.context && (
                  <p className="text-sm text-gray-500 mt-1">{entry.context}</p>
                )}
              </div>
              <button
                onClick={() => onRemoveEntry(entry.term)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
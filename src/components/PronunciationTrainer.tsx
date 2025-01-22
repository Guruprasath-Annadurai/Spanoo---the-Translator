import React, { useState } from 'react';
import { Mic, Volume2, CheckCircle, XCircle } from 'lucide-react';
import { PronunciationFeedback } from '../types';

interface PronunciationTrainerProps {
  word: string;
  onRecord: () => Promise<PronunciationFeedback>;
  onPlayReference: () => Promise<void>;
}

export const PronunciationTrainer: React.FC<PronunciationTrainerProps> = ({
  word,
  onRecord,
  onPlayReference,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<PronunciationFeedback | null>(null);

  const handleRecord = async () => {
    setIsRecording(true);
    const result = await onRecord();
    setFeedback(result);
    setIsRecording(false);
  };

  return (
    <div className="bg-navy-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-navy-900 mb-4">Pronunciation Trainer</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg">
          <span className="text-xl font-medium">{word}</span>
          <button
            onClick={onPlayReference}
            className="p-2 hover:bg-navy-100 rounded-full transition-colors"
          >
            <Volume2 className="w-5 h-5 text-navy-600" />
          </button>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleRecord}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isRecording
                ? 'bg-red-500 text-white'
                : 'bg-navy-500 text-white hover:bg-navy-600'
            }`}
          >
            <Mic className="w-5 h-5" />
            {isRecording ? 'Recording...' : 'Record Pronunciation'}
          </button>
        </div>

        {feedback && (
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {feedback.accuracy >= 0.8 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span className="font-medium">
                Accuracy: {Math.round(feedback.accuracy * 100)}%
              </span>
            </div>
            {feedback.corrections.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700">Suggestions:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {feedback.corrections.map((correction, index) => (
                    <li key={index}>
                      {correction.word}: {correction.suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
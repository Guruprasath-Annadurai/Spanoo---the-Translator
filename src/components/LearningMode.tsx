import React, { useState } from 'react';
import { BookOpen, Trophy, Zap } from 'lucide-react';
import { LearningProgress } from '../types';

interface LearningModeProps {
  progress: LearningProgress;
  onPractice: (word: string, correct: boolean) => void;
}

export const LearningMode: React.FC<LearningModeProps> = ({
  progress,
  onPractice,
}) => {
  const [currentWord, setCurrentWord] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-navy-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-navy-600" />
          <h3 className="text-lg font-semibold text-navy-900">Learning Mode</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">Level {progress.level}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">{progress.streak} day streak</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-inner">
        {currentWord ? (
          <div className="space-y-4">
            <p className="text-center text-xl font-medium">{currentWord}</p>
            {showAnswer ? (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => onPractice(currentWord, true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  I knew it
                </button>
                <button
                  onClick={() => onPractice(currentWord, false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Need practice
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full py-2 bg-navy-500 text-white rounded-lg"
              >
                Show Answer
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500">No words to practice right now</p>
          </div>
        )}
      </div>
    </div>
  );
};
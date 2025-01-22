import React from 'react';
import { Smile, Frown, Meh } from 'lucide-react';
import { EmotionData } from '../types';

interface EmotionRecognitionProps {
  emotion: EmotionData | null;
  isAnalyzing: boolean;
}

export const EmotionRecognition: React.FC<EmotionRecognitionProps> = ({
  emotion,
  isAnalyzing,
}) => {
  const getEmotionIcon = () => {
    if (!emotion) return <Meh className="w-6 h-6" />;
    switch (emotion.emotion) {
      case 'happy':
        return <Smile className="w-6 h-6 text-green-500" />;
      case 'sad':
        return <Frown className="w-6 h-6 text-blue-500" />;
      case 'angry':
        return <Frown className="w-6 h-6 text-red-500" />;
      default:
        return <Meh className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-navy-50 rounded-lg">
      {isAnalyzing ? (
        <div className="animate-pulse flex items-center gap-2">
          <div className="w-6 h-6 bg-navy-200 rounded-full" />
          <span className="text-sm text-navy-500">Analyzing emotion...</span>
        </div>
      ) : (
        <>
          {getEmotionIcon()}
          <span className="text-sm font-medium capitalize">
            {emotion?.emotion || 'No emotion detected'}
          </span>
          {emotion && (
            <span className="text-xs text-gray-500">
              ({Math.round(emotion.confidence * 100)}% confidence)
            </span>
          )}
        </>
      )}
    </div>
  );
};
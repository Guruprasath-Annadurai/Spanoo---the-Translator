import React, { useState } from 'react';
import { MessageSquare, Star, Bug, Lightbulb } from 'lucide-react';
import { UserFeedback as UserFeedbackType } from '../types';

interface UserFeedbackProps {
  onSubmit: (feedback: UserFeedbackType) => void;
}

export const UserFeedback: React.FC<UserFeedbackProps> = ({ onSubmit }) => {
  const [type, setType] = useState<UserFeedbackType['type']>('translation');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    onSubmit({
      type,
      rating,
      comment,
      timestamp: new Date(),
    });
    setComment('');
  };

  return (
    <div className="bg-navy-50 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-navy-600" />
        <h3 className="text-lg font-semibold text-navy-900">Your Feedback</h3>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          {[
            { value: 'translation', icon: <MessageSquare className="w-4 h-4" />, label: 'Translation' },
            { value: 'feature', icon: <Lightbulb className="w-4 h-4" />, label: 'Feature' },
            { value: 'bug', icon: <Bug className="w-4 h-4" />, label: 'Bug' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setType(option.value as UserFeedbackType['type'])}
              className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg ${
                type === option.value
                  ? 'bg-navy-500 text-white'
                  : 'bg-white text-navy-600 hover:bg-navy-100'
              }`}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => setRating(value)}
              className={`p-2 rounded-full ${
                value <= rating
                  ? 'text-yellow-500'
                  : 'text-gray-300'
              }`}
            >
              <Star className="w-6 h-6 fill-current" />
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us more about your experience..."
          className="w-full p-3 rounded-lg border border-navy-200 focus:ring-2 focus:ring-navy-500"
          rows={4}
        />

        <button
          onClick={handleSubmit}
          disabled={!comment}
          className="w-full py-2 bg-navy-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};
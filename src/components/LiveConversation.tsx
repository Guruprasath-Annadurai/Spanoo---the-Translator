import React, { useState, useEffect } from 'react';
import { Mic, Phone, PhoneOff } from 'lucide-react';

interface LiveConversationProps {
  fromLang: string;
  toLang: string;
  onTranscript: (text: string, lang: string) => void;
}

export const LiveConversation: React.FC<LiveConversationProps> = ({
  fromLang,
  toLang,
  onTranscript,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startConversation = () => {
    setIsActive(true);
    // In production, initialize WebRTC and real-time translation here
  };

  const stopConversation = () => {
    setIsActive(false);
    // Clean up WebRTC and translation streams
  };

  return (
    <div className="bg-navy-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-navy-900">Live Conversation</h3>
        <button
          onClick={isActive ? stopConversation : startConversation}
          className={`p-3 rounded-full transition-colors ${
            isActive ? 'bg-red-500 text-white' : 'bg-navy-500 text-white'
          }`}
        >
          {isActive ? <PhoneOff className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
        </button>
      </div>
      
      {isActive && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg min-h-[100px] shadow-inner">
            {transcript || 'Listening...'}
          </div>
          <div className="flex justify-center">
            <Mic className="w-6 h-6 text-navy-500 animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};
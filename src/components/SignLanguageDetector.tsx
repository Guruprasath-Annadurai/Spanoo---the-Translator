import React, { useState, useRef, useEffect } from 'react';
import { Hand, Camera, RefreshCcw } from 'lucide-react';
import { SignLanguageDetection } from '../types';

interface SignLanguageDetectorProps {
  onDetection: (detection: SignLanguageDetection) => void;
  isActive: boolean;
}

export const SignLanguageDetector: React.FC<SignLanguageDetectorProps> = ({
  onDetection,
  isActive,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [detectedGesture, setDetectedGesture] = useState<SignLanguageDetection | null>(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error('Error accessing camera:', err));
    }
  }, [isActive]);

  const calibrateDetector = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
    }, 3000);
  };

  return (
    <div className="bg-navy-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Hand className="w-5 h-5 text-navy-600" />
          <h3 className="text-lg font-semibold text-navy-900">Sign Language Detector</h3>
        </div>
        <button
          onClick={calibrateDetector}
          className="p-2 hover:bg-navy-100 rounded-full transition-colors"
        >
          <RefreshCcw className={`w-5 h-5 text-navy-600 ${isCalibrating ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {detectedGesture && (
            <div className="absolute bottom-0 left-0 right-0 bg-navy-900 bg-opacity-75 text-white p-4">
              <p className="font-medium">{detectedGesture.gesture}</p>
              <p className="text-sm opacity-75">
                Confidence: {Math.round(detectedGesture.confidence * 100)}%
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Camera className={`w-6 h-6 text-navy-500 ${isActive ? 'animate-pulse' : ''}`} />
        </div>
      </div>
    </div>
  );
};
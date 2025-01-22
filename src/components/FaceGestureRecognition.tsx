import React, { useState, useRef, useEffect } from 'react';
import { Smile, Camera, RefreshCcw } from 'lucide-react';
import { FaceGesture } from '../types';

interface FaceGestureRecognitionProps {
  onGestureDetected: (gesture: FaceGesture) => void;
  isActive: boolean;
}

export const FaceGestureRecognition: React.FC<FaceGestureRecognitionProps> = ({
  onGestureDetected,
  isActive,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [lastGesture, setLastGesture] = useState<FaceGesture | null>(null);

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
          <Smile className="w-5 h-5 text-navy-600" />
          <h3 className="text-lg font-semibold text-navy-900">Face Gesture Recognition</h3>
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
          {lastGesture && (
            <div className="absolute bottom-0 left-0 right-0 bg-navy-900 bg-opacity-75 text-white p-4">
              <p className="font-medium capitalize">{lastGesture.type}</p>
              <p className="text-sm opacity-75">
                Confidence: {Math.round(lastGesture.confidence * 100)}%
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
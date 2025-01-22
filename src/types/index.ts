export interface Language {
  code: string;
  name: string;
}

export interface TranslationResult {
  translatedText: string;
  detectedLanguage?: {
    language: string;
    confidence: number;
  };
}

export interface ThemeConfig {
  isDark: boolean;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
  };
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  autoDeleteDays: number;
  dataLocalization: string;
  visualAssistance: boolean;
  encryptData: boolean;
  watchCompatibility: boolean;
  learningMode: boolean;
  emotionRecognition: boolean;
  pronunciationTrainer: boolean;
  customDictionary: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  hearingAidMode: boolean;
  gestureControl: boolean;
  handsFreeMode: boolean;
  emergencyMode: boolean;
  signLanguageDetection: boolean;
  multiSensoryFeedback: boolean;
  voiceReplay: boolean;
  dynamicText: boolean;
  externalDevices: boolean;
  faceGestureRecognition: boolean;
}

export interface SignLanguageDetection {
  gesture: string;
  confidence: number;
  translation: string;
  handPosition: {
    x: number;
    y: number;
    z: number;
  };
}

export interface UserPersona {
  id: string;
  name: string;
  preferences: UserPreferences;
  commonPhrases: string[];
  favoriteLanguages: string[];
  accessibilityNeeds: string[];
  lastUsed: Date;
}

export interface FaceGesture {
  type: 'smile' | 'frown' | 'nod' | 'shake' | 'blink' | 'custom';
  confidence: number;
  timestamp: Date;
  duration: number;
}

export interface ExternalDevice {
  id: string;
  type: 'watch' | 'hearingAid' | 'brailleDisplay' | 'custom';
  name: string;
  status: 'connected' | 'disconnected' | 'pairing';
  batteryLevel?: number;
  lastSync: Date;
}

// Previous interfaces remain unchanged
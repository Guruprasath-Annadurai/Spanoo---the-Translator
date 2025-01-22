import React, { useState, useEffect } from 'react';
import { Globe2, ArrowLeftRight, Settings as SettingsIcon, Hand } from 'lucide-react';
import { TranslationBox } from './components/TranslationBox';
import { LanguageSelector } from './components/LanguageSelector';
import { ThemeToggle } from './components/ThemeToggle';
import { AudioInput } from './components/AudioInput';
import { Settings } from './components/Settings';
import { UserPreferences } from './types';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('es');
  const [isCopied, setIsCopied] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [signLanguageMode, setSignLanguageMode] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    autoDeleteDays: 30,
    dataLocalization: 'us',
    visualAssistance: false,
    encryptData: true,
    watchCompatibility: false,
  });

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    // Simulated translation delay - in production, replace with actual API call
    setTimeout(() => {
      setOutputText("Translation API would convert: " + inputText);
      setIsTranslating(false);
    }, 1000);
  };

  const swapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAudioInput = (text: string) => {
    setInputText(text);
  };

  useEffect(() => {
    if (inputText) {
      const debounce = setTimeout(() => {
        handleTranslate();
      }, 500);
      return () => clearTimeout(debounce);
    }
  }, [inputText, fromLang, toLang]);

  return (
    <div className={`min-h-screen transition-colors ${
      isDark ? 'bg-navy-900 text-white' : 'bg-gradient-to-b from-navy-50 to-navy-100'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <div className={`max-w-4xl mx-auto ${
          isDark ? 'bg-navy-800' : 'bg-white'
        } rounded-2xl shadow-xl p-6`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Globe2 className={`w-8 h-8 ${isDark ? 'text-navy-300' : 'text-navy-600'}`} />
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-navy-900'}`}>
                Spanoo
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <AudioInput onAudioInput={handleAudioInput} />
              <button
                onClick={() => setSignLanguageMode(!signLanguageMode)}
                className={`p-2 rounded-full transition-colors ${
                  signLanguageMode ? 'bg-navy-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
                title="Sign language mode"
              >
                <Hand className="w-5 h-5" />
              </button>
              <ThemeToggle isDark={isDark} onChange={setIsDark} />
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-full transition-colors ${
                  showSettings ? 'bg-navy-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <SettingsIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {showSettings ? (
            <Settings
              preferences={preferences}
              onPreferencesChange={setPreferences}
            />
          ) : (
            <div className="space-y-6">
              {/* Language Selection */}
              <div className="flex items-center gap-4">
                <LanguageSelector
                  value={fromLang}
                  onChange={setFromLang}
                  className="flex-1"
                />
                <button
                  onClick={swapLanguages}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeftRight className="w-5 h-5 text-gray-600" />
                </button>
                <LanguageSelector
                  value={toLang}
                  onChange={setToLang}
                  className="flex-1"
                />
              </div>

              {/* Translation Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TranslationBox
                  text={inputText}
                  placeholder="Enter text to translate..."
                  onChange={setInputText}
                  onCopy={() => copyToClipboard(inputText)}
                  isCopied={isCopied}
                />
                <TranslationBox
                  text={isTranslating ? "Translating..." : outputText}
                  placeholder="Translation will appear here..."
                  readonly
                  onCopy={() => copyToClipboard(outputText)}
                  isCopied={isCopied}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
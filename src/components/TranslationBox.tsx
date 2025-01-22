import React from 'react';
import { Copy, Check, Volume2 } from 'lucide-react';

interface TranslationBoxProps {
  text: string;
  placeholder: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  onCopy?: () => void;
  isCopied?: boolean;
}

export const TranslationBox: React.FC<TranslationBoxProps> = ({
  text,
  placeholder,
  onChange,
  readonly = false,
  onCopy,
  isCopied = false,
}) => {
  return (
    <div className="relative">
      <textarea
        value={text}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readonly}
        className="w-full h-48 p-4 bg-gray-50 rounded-lg border border-gray-200 focus:border-navy-500 focus:ring-1 focus:ring-navy-500 resize-none"
      />
      <div className="absolute bottom-4 right-4 flex gap-2">
        {text && (
          <>
            <button
              onClick={() => onCopy?.()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title={isCopied ? "Copied!" : "Copy to clipboard"}
            >
              {isCopied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Text to speech"
            >
              <Volume2 className="w-5 h-5 text-gray-600" />
            </button>
          </>
        )}
      </div>
      <div className="absolute bottom-4 left-4 text-sm text-gray-500">
        {text.length} / 5000
      </div>
    </div>
  );
}
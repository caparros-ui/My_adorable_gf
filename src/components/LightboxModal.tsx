import React from 'react';
import { X, Sparkles, Quote } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  quote: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  image,
  title,
  quote,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-bg/95 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full rounded-3xl overflow-hidden bg-surface border border-border shadow-2xl flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-bg hover:bg-accent hover:text-bg border border-border text-text-muted transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-[16/9] max-h-[70vh] bg-bg overflow-hidden flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-6 bg-surface border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-xl font-bold text-text-primary mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              {title}
            </h4>
            {quote && quote.trim() !== '' && (
              <p className="text-xs text-text-muted italic flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-accent-warm inline" />
                "{quote}"
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-bg hover:bg-accent hover:text-bg border border-border text-text-muted text-xs font-semibold"
          >
            Close Fullscreen
          </button>
        </div>
      </div>
    </div>
  );
};

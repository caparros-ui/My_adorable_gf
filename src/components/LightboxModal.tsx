import React from 'react';
import { X, Heart, Quote } from 'lucide-react';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#0d0617]/95 backdrop-blur-xl animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full rounded-3xl overflow-hidden bg-[#150a24] border border-pink-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-purple-950/80 hover:bg-pink-600 border border-pink-500/30 text-purple-200 hover:text-white transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-[16/9] max-h-[70vh] bg-purple-950/90 overflow-hidden flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-6 bg-gradient-to-r from-pink-950/40 via-purple-950/60 to-purple-950/40 border-t border-purple-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
              {title}
            </h4>
            <p className="text-xs text-pink-200/90 italic flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5 text-pink-400 inline" />
              "{quote}"
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-800 text-purple-200 text-xs font-semibold"
          >
            Close Fullscreen
          </button>
        </div>
      </div>
    </div>
  );
};

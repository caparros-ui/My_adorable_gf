import React, { useState } from 'react';
import { X, Lock, Unlock, Heart, Sparkles, Gift, Star } from 'lucide-react';

interface SecretVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretVaultModal: React.FC<SecretVaultModalProps> = ({ isOpen, onClose }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Accepts any passcode or empty click
    setUnlocked(true);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d0617]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-[#150a24] border border-pink-500/40 shadow-[0_20px_60px_rgba(236,72,153,0.3)] overflow-hidden flex flex-col p-6 sm:p-8 text-center">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-purple-900/40 hover:bg-purple-800 text-purple-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!unlocked ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white mb-4 shadow-[0_0_25px_rgba(236,72,153,0.6)] animate-bounce">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Secret Surprise Vault
            </h3>
            <p className="text-xs text-purple-200 mb-6">
              Enter any passcode or click unlock to open our secret message box!
            </p>

            <form onSubmit={handleUnlock} className="w-full space-y-4">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. 1234 or love)"
                className="w-full p-3.5 text-center rounded-2xl bg-purple-950/80 border border-pink-500/30 text-white font-mono text-sm tracking-widest focus:outline-none focus:border-pink-500 placeholder-purple-400/50"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-fuchsia-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(236,72,153,0.5)] flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <Unlock className="w-4 h-4" />
                Unlock Secret Message
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white mb-4 shadow-[0_0_30px_rgba(236,72,153,0.8)]">
              <Gift className="w-8 h-8 text-pink-200" />
            </div>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              Surprise Unlocked!
            </span>

            <h3 className="font-serif text-2xl font-bold bg-gradient-to-r from-pink-300 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent mb-4">
              To My Forever Love
            </h3>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-950/60 to-purple-950/60 border border-pink-500/30 text-purple-100 text-sm leading-relaxed italic mb-6 shadow-inner">
              "No matter where life takes us, through all of life's highs and quiet nights, choosing you is the best decision I will ever make. I love you more than words could ever say."
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-pink-500/30 text-pink-300 text-xs font-semibold transition-all"
            >
              Close Box
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

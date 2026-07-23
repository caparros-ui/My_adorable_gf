import React, { useState } from 'react';
import { X, Lock, Unlock, Sparkles, Gift } from 'lucide-react';

interface SecretVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretVaultModal: React.FC<SecretVaultModalProps> = ({ isOpen, onClose }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setUnlocked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/90 animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-surface border border-border shadow-2xl overflow-hidden flex flex-col p-6 sm:p-8 text-center">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-bg hover:bg-accent hover:text-bg text-text-muted transition-colors border border-border"
        >
          <X className="w-5 h-5" />
        </button>

        {!unlocked ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-accent text-bg flex items-center justify-center mb-4 shadow-md animate-bounce">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-text-primary mb-2">
              Secret Message Vault
            </h3>
            <p className="text-xs text-text-muted mb-6">
              Enter any passcode or click unlock to open the secret box!
            </p>

            <form onSubmit={handleUnlock} className="w-full space-y-4">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. 1234)"
                className="w-full p-3.5 text-center rounded-2xl bg-bg border border-border text-text-primary font-mono text-sm tracking-widest focus:outline-none focus:border-accent placeholder-text-muted/50"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-accent hover:bg-[#e0a3a7] text-bg font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <Unlock className="w-4 h-4" />
                Unlock Secret Message
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-accent text-bg flex items-center justify-center mb-4 shadow-md">
              <Gift className="w-8 h-8 text-bg" />
            </div>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              Message Unlocked!
            </span>

            <h3 className="font-serif text-2xl font-bold text-text-primary mb-4">
              Special Note
            </h3>

            <div className="p-5 rounded-2xl bg-bg border border-border text-text-primary text-sm leading-relaxed italic mb-6">
              "Welcome to your secret vault box! You can customize this message with any text or note you want."
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-bg hover:bg-accent hover:text-bg border border-border text-text-muted text-xs font-semibold transition-all"
            >
              Close Box
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

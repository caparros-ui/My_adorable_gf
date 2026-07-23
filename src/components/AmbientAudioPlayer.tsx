import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

export const AmbientAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Synthesize soft romantic ambient chords using Web Audio API
  const startAmbientSynth = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (!gainNodeRef.current) {
        gainNodeRef.current = ctx.createGain();
        gainNodeRef.current.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
        gainNodeRef.current.connect(ctx.destination);
      }

      // Frequencies for a romantic ethereal chord progression (Fmaj7 -> Cmaj7 -> Am7)
      const chordProgressions = [
        [349.23, 440.00, 523.25, 659.25], // Fmaj7
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [293.66, 349.23, 440.00, 523.25]  // Dm7
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const currentCtx = audioCtxRef.current;
        const chord = chordProgressions[chordIndex];
        chordIndex = (chordIndex + 1) % chordProgressions.length;

        chord.forEach((freq, i) => {
          const osc = currentCtx.createOscillator();
          const noteGain = currentCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, currentCtx.currentTime);

          // Soft attack and decay
          const now = currentCtx.currentTime;
          const duration = 4.5;

          noteGain.gain.setValueAtTime(0.001, now);
          noteGain.gain.linearRampToValueAtTime(0.06 / (i + 1), now + 1.2);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

          osc.connect(noteGain);
          if (gainNodeRef.current) {
            noteGain.connect(gainNodeRef.current);
          }

          osc.start(now);
          osc.stop(now + duration);
        });
      };

      playChord();
      intervalRef.current = window.setInterval(playChord, 4000);
    } catch (e) {
      console.warn("Audio Context init error:", e);
    }
  };

  const stopAmbientSynth = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAmbientSynth();
      setIsPlaying(false);
    } else {
      startAmbientSynth();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume * 0.15, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-purple-950/60 border border-pink-500/30 backdrop-blur-md text-xs text-purple-200">
      <button
        onClick={togglePlay}
        className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors focus:outline-none"
        title={isPlaying ? "Pause Ambient Music" : "Play Ambient Music"}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="hidden sm:inline font-medium text-pink-300">Romantic Melody</span>
            {/* Equalizer bar animation */}
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-full bg-pink-400 animate-pulse" style={{ animationDuration: '0.6s' }}></span>
              <span className="w-0.5 h-2/3 bg-purple-400 animate-pulse" style={{ animationDuration: '0.9s' }}></span>
              <span className="w-0.5 h-4/5 bg-pink-300 animate-pulse" style={{ animationDuration: '0.4s' }}></span>
            </div>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline font-medium text-purple-300">Music Off</span>
          </>
        )}
      </button>

      {isPlaying && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-14 accent-pink-500 cursor-pointer h-1 bg-purple-900 rounded-lg"
          title="Adjust Volume"
        />
      )}
    </div>
  );
};

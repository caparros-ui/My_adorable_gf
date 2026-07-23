import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles, Disc } from 'lucide-react';

export const AmbientAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [mode, setMode] = useState<'mp3' | 'synth'>('mp3');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showExpanded, setShowExpanded] = useState(false);

  // Audio HTML element reference for MP3 playback
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio API refs for ambient synth mode
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Initialize HTML Audio for Balisong.mp3
  useEffect(() => {
    const audio = new Audio('/Balisong.mp3');
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Sync volume with audio element and synth
  useEffect(() => {
    const effectiveVolume = isMuted ? 0 : volume;
    if (audioRef.current) {
      audioRef.current.volume = effectiveVolume;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(effectiveVolume * 0.15, audioCtxRef.current.currentTime);
    }
  }, [volume, isMuted]);

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
        gainNodeRef.current.gain.setValueAtTime((isMuted ? 0 : volume) * 0.15, ctx.currentTime);
        gainNodeRef.current.connect(ctx.destination);
      }

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

          const now = currentCtx.currentTime;
          const noteDuration = 4.5;

          noteGain.gain.setValueAtTime(0.001, now);
          noteGain.gain.linearRampToValueAtTime(0.06 / (i + 1), now + 1.2);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, now + noteDuration);

          osc.connect(noteGain);
          if (gainNodeRef.current) {
            noteGain.connect(gainNodeRef.current);
          }

          osc.start(now);
          osc.stop(now + noteDuration);
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
      if (mode === 'mp3') {
        audioRef.current?.pause();
      } else {
        stopAmbientSynth();
      }
      setIsPlaying(false);
    } else {
      if (mode === 'mp3') {
        stopAmbientSynth();
        audioRef.current?.play().catch((err) => console.warn("Audio play blocked by browser:", err));
      } else {
        audioRef.current?.pause();
        startAmbientSynth();
      }
      setIsPlaying(true);
    }
  };

  const handleModeSwitch = (newMode: 'mp3' | 'synth') => {
    if (newMode === mode) return;
    const wasPlaying = isPlaying;

    if (isPlaying) {
      if (mode === 'mp3') audioRef.current?.pause();
      else stopAmbientSynth();
    }

    setMode(newMode);

    if (wasPlaying) {
      if (newMode === 'mp3') {
        audioRef.current?.play().catch((err) => console.warn("Audio play blocked:", err));
      } else {
        startAmbientSynth();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#222E3A]/90 border border-[#E8B4B8]/30 backdrop-blur-md text-xs text-purple-200 shadow-md">
        
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-7 h-7 rounded-full bg-[#E8B4B8] text-[#2B3A4A] hover:bg-white transition-all transform hover:scale-105 shadow-sm focus:outline-none shrink-0"
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        {/* Track Title / Equalizer */}
        <button
          onClick={() => setShowExpanded(!showExpanded)}
          className="flex items-center gap-2 text-left focus:outline-none group"
        >
          <div className="flex flex-col">
            <span className="font-semibold text-white group-hover:text-[#E8B4B8] transition-colors leading-tight truncate max-w-[100px] sm:max-w-[130px]">
              {mode === 'mp3' ? 'Balisong' : 'Romantic Synth'}
            </span>
            <span className="text-[10px] text-[#E8B4B8]/80 leading-tight truncate max-w-[100px] sm:max-w-[130px]">
              {mode === 'mp3' ? 'Rivermaya' : 'Ambient Chords'}
            </span>
          </div>

          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3 shrink-0 ml-1">
              <span className="w-0.5 h-full bg-[#E8B4B8] animate-pulse" style={{ animationDuration: '0.6s' }}></span>
              <span className="w-0.5 h-2/3 bg-purple-400 animate-pulse" style={{ animationDuration: '0.9s' }}></span>
              <span className="w-0.5 h-4/5 bg-[#E8B4B8] animate-pulse" style={{ animationDuration: '0.4s' }}></span>
            </div>
          )}
        </button>

        {/* Mute/Volume Toggle Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-[#E8B4B8]/80 hover:text-[#E8B4B8] transition-colors p-1"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-3.5 h-3.5 text-red-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Popover detailed player menu */}
      {showExpanded && (
        <div className="absolute bottom-full left-0 mb-3 w-72 p-4 rounded-2xl bg-[#23313F]/95 border border-[#E8B4B8]/40 shadow-2xl backdrop-blur-xl z-50 text-white space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Disc className={`w-4 h-4 text-[#E8B4B8] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              <span className="text-xs font-bold tracking-wide uppercase text-[#E8B4B8]">Audio Player</span>
            </div>
            <button
              onClick={() => setShowExpanded(false)}
              className="text-xs text-white/50 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex rounded-lg bg-black/30 p-1 text-xs">
            <button
              onClick={() => handleModeSwitch('mp3')}
              className={`flex-1 py-1 px-2 rounded-md font-medium transition-all ${
                mode === 'mp3' ? 'bg-[#E8B4B8] text-[#2B3A4A] shadow' : 'text-white/70 hover:text-white'
              }`}
            >
              🎵 Balisong (MP3)
            </button>
            <button
              onClick={() => handleModeSwitch('synth')}
              className={`flex-1 py-1 px-2 rounded-md font-medium transition-all ${
                mode === 'synth' ? 'bg-[#E8B4B8] text-[#2B3A4A] shadow' : 'text-white/70 hover:text-white'
              }`}
            >
              ✨ Soft Synth
            </button>
          </div>

          {/* Scrubber for MP3 */}
          {mode === 'mp3' && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-white/60 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/20 rounded-lg accent-[#E8B4B8] cursor-pointer"
              />
            </div>
          )}

          {/* Volume Control */}
          <div className="flex items-center gap-2 pt-1">
            <Volume2 className="w-3.5 h-3.5 text-[#E8B4B8]" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-full h-1 bg-white/20 rounded-lg accent-[#E8B4B8] cursor-pointer"
            />
            <span className="text-[10px] font-mono text-white/70 min-w-[28px] text-right">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};


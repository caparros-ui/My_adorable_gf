import React from 'react';

interface PlaceholderImageProps {
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  label?: string;
  sublabel?: string;
  className?: string;
  variant?: 'canvas' | 'archival' | 'portrait' | 'landscape' | 'minimal';
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width = '100%',
  height = '100%',
  aspectRatio = '4/3',
  label = 'ARTWORK PLACEHOLDER',
  sublabel = '[ BLANK IMAGE ]',
  className = '',
  variant = 'canvas',
}) => {
  return (
    <div
      className={`relative overflow-hidden select-none border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/80 rounded-lg flex flex-col items-center justify-center p-6 text-center transition-all ${className}`}
      style={{
        width,
        height,
        aspectRatio: aspectRatio !== 'custom' ? aspectRatio : undefined,
      }}
    >
      {/* Structural Wireframe SVG Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none stroke-current text-neutral-900 dark:text-neutral-100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="0" x2="100%" y2="100%" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="100%" y1="0" x2="0" y2="100%" strokeWidth="1" strokeDasharray="4 4" />
        <rect x="5%" y="5%" width="90%" height="90%" fill="none" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="50%" cy="50%" r="25%" fill="none" strokeWidth="1" />
      </svg>

      {/* Variant Icon Graphics */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
        <div className="w-12 h-12 rounded-full border border-neutral-400 dark:border-neutral-700 flex items-center justify-center bg-white/40 dark:bg-neutral-800/40 backdrop-blur-sm shadow-sm">
          {variant === 'archival' ? (
            <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ) : variant === 'portrait' ? (
            <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>

        {/* Text Details */}
        <span className="text-xs font-mono tracking-widest text-neutral-600 dark:text-neutral-400 uppercase font-semibold">
          {label}
        </span>
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {sublabel}
        </span>
      </div>

      {/* Frame Corners */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-neutral-400 dark:border-neutral-600" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-neutral-400 dark:border-neutral-600" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-neutral-400 dark:border-neutral-600" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-neutral-400 dark:border-neutral-600" />
    </div>
  );
};

import React, { useState } from 'react';
import { ProvenanceRecord, TimelineEvent } from '../types/tracingArt';
import { PlaceholderImage } from './PlaceholderImage';

interface Chapter1Props {
  records: ProvenanceRecord[];
  events: TimelineEvent[];
  onOpenLedger: (record: ProvenanceRecord) => void;
}

export const Chapter1Tracing: React.FC<Chapter1Props> = ({
  records,
  events,
  onOpenLedger,
}) => {
  const [selectedEventIndex, setSelectedEventIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const activeEvent = events[selectedEventIndex];
  const activeRecord = records.find((r) => r.id === activeEvent.recordId);

  return (
    <section className="relative min-h-screen pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Chapter Title Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12 animate-fadeIn">
        <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase block mb-2">
          CHAPTER 01 • PROVENANCE TIMELINE
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4">
          Tracing a Painting Through Time
        </h1>
        <p className="text-sm sm:text-base font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Follow the journey of a single masterpiece across three centuries, moving from an artist’s studio in 17th-century Amsterdam through aristocratic French cabinets to modern museum galleries.
        </p>
      </div>

      {/* Main Interactive Viewer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-8">
        {/* Left Side: Artwork Viewport with Zoom & Controls */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 p-4 transition-transform duration-500">
            {/* Canvas Zoom Container */}
            <div
              className="w-full h-full transition-transform duration-500 ease-out flex items-center justify-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <PlaceholderImage
                variant="canvas"
                label={`WILLEM KALF (1662) — ${activeEvent.title}`}
                sublabel={`[ BLANK IMAGE PLACEHOLDER • YEAR ${activeEvent.year} ]`}
                aspectRatio="custom"
                className="w-full h-full border-0 bg-transparent"
              />
            </div>

            {/* Viewport Overlay Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
              <div className="bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-mono text-neutral-300 border border-neutral-800 shadow-md">
                <span>YEAR: <strong className="text-emerald-400">{activeEvent.year}</strong></span>
                <span className="mx-2">•</span>
                <span>{activeEvent.location}</span>
              </div>

              {/* Zoom Buttons */}
              <div className="flex items-center space-x-1.5 bg-neutral-900/90 backdrop-blur-md p-1 rounded-full border border-neutral-800 shadow-md">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.2))}
                  className="p-1.5 text-neutral-300 hover:text-white transition-colors"
                  title="Zoom In"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="px-2 py-0.5 text-[10px] font-mono text-neutral-400 hover:text-white"
                  title="Reset Zoom"
                >
                  RESET
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(1, z - 0.2))}
                  className="p-1.5 text-neutral-300 hover:text-white transition-colors"
                  title="Zoom Out"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Active Provenance Detail Card */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                MILESTONE {selectedEventIndex + 1} OF {events.length}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                {activeRecord?.transactionType}
              </span>
            </div>

            <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-1">
              {activeEvent.title}
            </h2>
            <h3 className="text-sm font-mono text-neutral-500 dark:text-neutral-400 mb-4">
              {activeEvent.subtitle}
            </h3>

            <p className="text-xs sm:text-sm font-sans text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
              {activeEvent.description}
            </p>

            {/* Document Reference Box */}
            {activeRecord && (
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500">Document:</span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100 truncate max-w-[200px]">
                    {activeRecord.documentTitle}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500">Owner/Holder:</span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {activeRecord.owner}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500">Historical Price:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {activeRecord.price || 'N/A'}
                  </span>
                </div>
              </div>
            )}

            {/* Inspect Button */}
            {activeRecord && (
              <button
                onClick={() => onOpenLedger(activeRecord)}
                className="w-full py-3 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-mono font-semibold tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>INSPECT ARCHIVAL LEDGER</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Bottom Timeline Bar */}
      <div className="mt-8 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg">
        <div className="flex items-center justify-between mb-4 text-xs font-mono">
          <span className="font-bold text-neutral-900 dark:text-neutral-100">PROVENANCE CHRONOLOGY (1662 – 1988)</span>
          <span className="text-neutral-400">Click any milestone or drag slider</span>
        </div>

        {/* Timeline Event Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {events.map((ev, index) => {
            const isSelected = index === selectedEventIndex;
            return (
              <button
                key={ev.year}
                onClick={() => setSelectedEventIndex(index)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-sm'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/40'
                }`}
              >
                <span className={`text-xs font-mono font-bold block ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-900 dark:text-neutral-100'}`}>
                  {ev.year}
                </span>
                <span className="text-[11px] font-sans text-neutral-500 dark:text-neutral-400 truncate block mt-0.5">
                  {ev.location}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

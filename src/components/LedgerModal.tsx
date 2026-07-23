import React from 'react';
import { ProvenanceRecord } from '../types/tracingArt';
import { PlaceholderImage } from './PlaceholderImage';

interface LedgerModalProps {
  record: ProvenanceRecord | null;
  onClose: () => void;
}

export const LedgerModal: React.FC<LedgerModalProps> = ({ record, onClose }) => {
  if (!record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        {/* Left Side: Document Visual Placeholder */}
        <div className="w-full md:w-1/2 p-6 bg-neutral-100 dark:bg-neutral-950 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800">
          <div className="w-full aspect-[4/5] relative">
            <PlaceholderImage
              variant="archival"
              label="ARCHIVAL CATALOG PAGE"
              sublabel={record.catalogId}
              aspectRatio="custom"
              className="h-full"
            />
          </div>
          <span className="mt-3 text-[11px] font-mono text-neutral-400 dark:text-neutral-500 text-center">
            Original Record: {record.documentTitle}
          </span>
        </div>

        {/* Right Side: Transcribed Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                  RECORD #{record.catalogId}
                </span>
                <h3 className="text-xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                  {record.owner}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono mb-6">
              <div className="p-2.5 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800">
                <span className="text-neutral-400 block text-[10px]">DATE & YEAR</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">{record.dateString}</span>
              </div>
              <div className="p-2.5 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800">
                <span className="text-neutral-400 block text-[10px]">LOCATION</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">{record.location}</span>
              </div>
              <div className="p-2.5 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800">
                <span className="text-neutral-400 block text-[10px]">TRANSACTION TYPE</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">{record.transactionType}</span>
              </div>
              <div className="p-2.5 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800">
                <span className="text-neutral-400 block text-[10px]">PRICE / VALUE</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {record.price || 'N/A'} {record.priceUSD ? `(${record.priceUSD})` : ''}
                </span>
              </div>
            </div>

            {/* Transcription Box */}
            <div className="space-y-2 mb-4">
              <h4 className="text-[11px] font-mono font-bold tracking-wider text-neutral-500 uppercase">
                ARCHIVAL TRANSCRIPTION
              </h4>
              <blockquote className="p-3.5 rounded-lg bg-amber-500/5 border-l-2 border-amber-500 text-xs italic font-serif text-neutral-800 dark:text-neutral-200">
                "{record.transcription}"
              </blockquote>
            </div>

            {/* Notes */}
            <div className="space-y-1 text-xs font-sans text-neutral-600 dark:text-neutral-400">
              <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase">HISTORICAL NOTES</span>
              <p>{record.notes}</p>
            </div>
          </div>

          {/* Footer action */}
          <div className="pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-[10px] font-mono text-neutral-400">Getty LOD URI: {record.catalogId}</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-mono font-semibold hover:opacity-90 transition-opacity"
            >
              Close Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-bg/90 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        {/* Left Side: Document Visual Placeholder */}
        <div className="w-full md:w-1/2 p-6 bg-bg flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border">
          <div className="w-full aspect-[4/5] relative">
            <PlaceholderImage
              variant="archival"
              label="ARCHIVAL CATALOG PAGE"
              sublabel={record.catalogId}
              aspectRatio="custom"
              className="h-full"
            />
          </div>
          <span className="mt-3 text-[11px] font-mono text-text-muted text-center">
            Original Record: {record.documentTitle}
          </span>
        </div>

        {/* Right Side: Transcribed Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase">
                  RECORD #{record.catalogId}
                </span>
                <h3 className="text-xl font-serif font-bold text-text-primary mt-0.5">
                  {record.owner}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-bg text-text-muted hover:text-text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono mb-6">
              <div className="p-2.5 rounded bg-bg border border-border">
                <span className="text-text-muted block text-[10px]">DATE & YEAR</span>
                <span className="font-semibold text-text-primary">{record.dateString}</span>
              </div>
              <div className="p-2.5 rounded bg-bg border border-border">
                <span className="text-text-muted block text-[10px]">LOCATION</span>
                <span className="font-semibold text-text-primary">{record.location}</span>
              </div>
              <div className="p-2.5 rounded bg-bg border border-border">
                <span className="text-text-muted block text-[10px]">TRANSACTION TYPE</span>
                <span className="font-semibold text-text-primary">{record.transactionType}</span>
              </div>
              <div className="p-2.5 rounded bg-bg border border-border">
                <span className="text-text-muted block text-[10px]">PRICE / VALUE</span>
                <span className="font-semibold text-accent">
                  {record.price || 'N/A'} {record.priceUSD ? `(${record.priceUSD})` : ''}
                </span>
              </div>
            </div>

            {/* Transcription Box */}
            <div className="space-y-2 mb-4">
              <h4 className="text-[11px] font-mono font-bold tracking-wider text-text-muted uppercase">
                ARCHIVAL TRANSCRIPTION
              </h4>
              <blockquote className="p-3.5 rounded-lg bg-surface border-l-2 border-accent-warm text-xs italic font-serif text-text-primary">
                "{record.transcription}"
              </blockquote>
            </div>

            {/* Notes */}
            <div className="space-y-1 text-xs font-sans text-text-muted">
              <span className="font-mono text-[10px] font-bold text-text-muted uppercase">HISTORICAL NOTES</span>
              <p>{record.notes}</p>
            </div>
          </div>

          {/* Footer action */}
          <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
            <span className="text-[10px] font-mono text-text-muted">Getty LOD URI: {record.catalogId}</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-accent hover:bg-[#e0a3a7] text-bg text-xs font-mono font-semibold transition-opacity"
            >
              Close Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

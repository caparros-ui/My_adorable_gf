import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-bg/80 animate-fadeIn">
      {/* Modal Container */}
      <div className="w-full max-w-xl bg-surface h-full p-8 sm:p-10 flex flex-col justify-between overflow-y-auto border-l border-border shadow-2xl animate-slideLeft">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-border pb-6 mb-8">
            <div>
              <span className="text-xs font-mono tracking-widest text-accent font-bold uppercase block">
                About the Project
              </span>
              <h2 className="text-2xl font-serif font-bold text-text-primary mt-1">
                Tracing Art: Getty Provenance Index
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-bg text-text-muted hover:text-text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body Content */}
          <div className="space-y-6 text-sm leading-relaxed text-text-muted font-sans">
            <p className="text-base font-serif italic text-text-primary">
              "Tracing Art bridges archival historical records and dynamic digital storytelling, revealing how artworks travel across cultures, collections, and centuries."
            </p>

            <div className="p-4 rounded-xl bg-bg border border-border space-y-2">
              <h3 className="font-mono text-xs font-bold text-text-primary uppercase tracking-wider">
                What is Provenance Research?
              </h3>
              <p className="text-xs text-text-muted">
                Provenance is the documented history of an artwork’s ownership, creation, transfers, sales, and locations. Understanding provenance helps art historians verify authenticity, trace cultural heritage, and study the evolution of historical art markets.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-text-primary uppercase tracking-wider">
                Key Platform Features
              </h4>
              <ul className="space-y-2.5 text-xs font-mono text-text-muted">
                <li className="flex items-start space-x-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Linked Open Data (LOD):</strong> Connects millions of records across international archives, museums, and private inventories.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Interactive Node Graphs:</strong> Visualizes relationships between painters, collectors, art dealers, and institutions.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Archival Document Ledgers:</strong> Real-time inspection of historical catalog entries, auction lots, and currencies.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-dashed border-border bg-bg/50 space-y-2 text-xs font-mono">
              <span className="font-bold text-text-primary">RESEARCH METHODOLOGY & DATASET</span>
              <p className="text-text-muted">
                Data presented in this application is derived from the Getty Provenance Index®, containing over 2.3 million records from Dutch, French, British, German, and Italian historical catalogs spanning 1550–1990.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-border flex items-center justify-between text-xs font-mono text-text-muted">
          <span>Getty Research Institute</span>
          <a
            href="https://www.getty.edu/research/tools/provenance/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline hover:opacity-80"
          >
            Visit Getty Provenance Index →
          </a>
        </div>
      </div>

      {/* Outside Overlay */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div className="w-full max-w-xl bg-white dark:bg-neutral-900 h-full p-8 sm:p-10 flex flex-col justify-between overflow-y-auto border-l border-neutral-200 dark:border-neutral-800 shadow-2xl animate-slideLeft">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6 mb-8">
            <div>
              <span className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 font-bold uppercase block">
                About the Project
              </span>
              <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                Tracing Art: Getty Provenance Index
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body Content */}
          <div className="space-y-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 font-sans">
            <p className="text-base font-serif italic text-neutral-900 dark:text-neutral-100">
              "Tracing Art bridges archival historical records and dynamic digital storytelling, revealing how artworks travel across cultures, collections, and centuries."
            </p>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h3 className="font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                What is Provenance Research?
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Provenance is the documented history of an artwork’s ownership, creation, transfers, sales, and locations. Understanding provenance helps art historians verify authenticity, trace cultural heritage, and study the evolution of historical art markets.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                Key Platform Features
              </h4>
              <ul className="space-y-2.5 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Linked Open Data (LOD):</strong> Connects millions of records across international archives, museums, and private inventories.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Interactive Node Graphs:</strong> Visualizes relationships between painters, collectors, art dealers, and institutions.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Archival Document Ledgers:</strong> Real-time inspection of historical catalog entries, auction lots, and currencies.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-900/50 space-y-2 text-xs font-mono">
              <span className="font-bold text-neutral-800 dark:text-neutral-200">RESEARCH METHODOLOGY & DATASET</span>
              <p className="text-neutral-500 dark:text-neutral-400">
                Data presented in this application is derived from the Getty Provenance Index®, containing over 2.3 million records from Dutch, French, British, German, and Italian historical catalogs spanning 1550–1990.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
          <span>Getty Research Institute</span>
          <a
            href="https://www.getty.edu/research/tools/provenance/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 underline hover:opacity-80"
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

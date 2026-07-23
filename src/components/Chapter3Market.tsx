import React, { useState } from 'react';
import { ProvenanceRecord } from '../types/tracingArt';

interface Chapter3Props {
  records: ProvenanceRecord[];
  onOpenLedger: (record: ProvenanceRecord) => void;
}

export const Chapter3Market: React.FC<Chapter3Props> = ({ records, onOpenLedger }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('ALL');

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.catalogId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.documentTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'ALL' || r.transactionType.toUpperCase() === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <section className="relative min-h-screen pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase block mb-2">
          CHAPTER 03 • MARKET ANALYTICS
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4">
          Collectors, Museums, and the Market
        </h1>
        <p className="text-sm sm:text-base font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Aggregating historical sales catalogs, probate inventories, and museum acquisitions to transform archival data into macro art market insights.
        </p>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl shadow-md text-center">
          <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">TOTAL AGGREGATED RECORDS</span>
          <span className="text-3xl font-serif font-bold text-emerald-600 dark:text-emerald-400">2,350,000+</span>
          <span className="text-xs font-sans text-neutral-500 block mt-1">Spanning 1550 – Present</span>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl shadow-md text-center">
          <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">LINKED ARTWORKS & OBJECTS</span>
          <span className="text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">480,000</span>
          <span className="text-xs font-sans text-neutral-500 block mt-1">Cross-referenced LOD entities</span>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl shadow-md text-center">
          <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">HISTORICAL CATALOGS</span>
          <span className="text-3xl font-serif font-bold text-indigo-600 dark:text-indigo-400">45,000</span>
          <span className="text-xs font-sans text-neutral-500 block mt-1">Auction & probate ledgers</span>
        </div>
      </div>

      {/* Searchable Provenance Directory */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h3 className="text-xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Provenance Ledger Explorer
            </h3>
            <p className="text-xs font-mono text-neutral-400">
              Filter by owner, location, or transaction type
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search owner or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 text-xs font-mono text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Type Selector */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 text-xs font-mono text-neutral-900 dark:text-neutral-100 focus:outline-none"
            >
              <option value="ALL">ALL TYPES</option>
              <option value="COMMISSION">COMMISSION</option>
              <option value="INHERITANCE">INHERITANCE</option>
              <option value="AUCTION">AUCTION</option>
              <option value="PRIVATE SALE">PRIVATE SALE</option>
            </select>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 text-[10px] uppercase">
                <th className="pb-3 font-semibold">YEAR / DATE</th>
                <th className="pb-3 font-semibold">OWNER / HOLDER</th>
                <th className="pb-3 font-semibold">LOCATION</th>
                <th className="pb-3 font-semibold">TYPE</th>
                <th className="pb-3 font-semibold">PRICE</th>
                <th className="pb-3 font-semibold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                  <td className="py-4 font-bold text-neutral-900 dark:text-neutral-100">{r.year}</td>
                  <td className="py-4 font-serif text-sm font-semibold text-neutral-900 dark:text-neutral-100">{r.owner}</td>
                  <td className="py-4 text-neutral-500">{r.location}</td>
                  <td className="py-4">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {r.transactionType}
                    </span>
                  </td>
                  <td className="py-4 font-semibold text-emerald-600 dark:text-emerald-400">{r.price || '—'}</td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => onOpenLedger(r)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-[11px] font-semibold hover:opacity-80 transition-opacity"
                    >
                      Inspect Ledger
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRecords.length === 0 && (
            <div className="py-12 text-center text-xs font-mono text-neutral-400">
              No matching records found. Try adjusting search queries or filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

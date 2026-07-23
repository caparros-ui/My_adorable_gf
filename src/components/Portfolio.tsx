import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import { PortfolioItem } from '../types';
import { LightboxModal } from './LightboxModal';
import { Maximize2, Sparkles } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const categories = ['All', 'Photography', 'Branding', 'Visuals', 'Design'];

  const filteredItems = selectedCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  const activeItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  const handlePrev = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section id="portfolio" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase mb-3">
            <span className="w-6 h-px bg-accent" />
            <span>Selected Works</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            Curated Portfolio
          </h2>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-surface border border-border">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedItemIndex(null);
              }}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-accent text-bg shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedItemIndex(index)}
            className="group cursor-pointer flex flex-col"
          >
            {/* Image Frame */}
            <div className="ph-frame aspect-square w-full relative overflow-hidden rounded-3xl border border-border group-hover:border-accent/60 transition-all duration-500 shadow-xl group-hover:-translate-y-2">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />

              {/* Hover Dark Overlay & Quick Action */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
                <div className="flex justify-end">
                  <div className="p-3 rounded-full bg-surface border border-border text-text-primary group-hover:rotate-45 transition-transform duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold tracking-widest text-accent uppercase px-2.5 py-1 rounded-full bg-accent/20 border border-accent/30 inline-block mb-2">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-xl font-bold text-text-primary">{item.title}</h4>
                </div>
              </div>
            </div>

            {/* Static Caption below frame */}
            <div className="mt-4 px-1">
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-text-muted mt-1">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={activeItem}
        onClose={() => setSelectedItemIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};

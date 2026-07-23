import React, { useEffect, useRef, useState } from 'react';
import { TIMELINE_DATA } from '../data/portfolioData';
import { Calendar } from 'lucide-react';

export const Journey: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      let progress = (windowHeight * 0.7 - rect.top) / totalHeight;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="journey" className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase mb-3">
          <span className="w-6 h-px bg-accent" />
          <span>Her Milestone Journey</span>
          <span className="w-6 h-px bg-accent" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Milestones &amp; Evolution
        </h2>
        <p className="text-text-muted text-base">
          A narrative thread of creative turning points, key projects, and continuous aesthetic discovery.
        </p>
      </div>

      {/* Timeline Container */}
      <div ref={timelineRef} className="relative pl-8 sm:pl-12 border-l-2 border-border space-y-12">
        {/* Animated Fill Line */}
        <div
          className="absolute left-0 top-0 w-0.5 bg-accent transition-all duration-150 ease-out"
          style={{ height: `${scrollProgress}%` }}
        />

        {TIMELINE_DATA.map((milestone) => (
          <div key={milestone.id} className="relative group">
            {/* Timeline Dot Node */}
            <div className="absolute -left-[41px] sm:-left-[57px] top-1.5 w-5 h-5 rounded-full bg-bg border-2 border-accent group-hover:bg-accent group-hover:scale-125 transition-all duration-300 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-bg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border group-hover:border-accent/40 transition-all duration-300 shadow-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-serif font-semibold tracking-wider mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>{milestone.year}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                {milestone.title}
              </h3>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

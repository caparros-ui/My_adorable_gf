import React from 'react';
import { ABOUT_DATA } from '../data/portfolioData';
import { Palette, Eye, Compass, Feather } from 'lucide-react';

export const About: React.FC = () => {
  const highlights = [
    { icon: Eye, title: 'Visual Direction', desc: 'Crafting captivating visual identities & mood boards.' },
    { icon: Palette, title: 'Color Theory & Tone', desc: 'Sophisticated color palettes with high-contrast vibrancy.' },
    { icon: Compass, title: 'Spatial Composition', desc: 'Harmonious layout balance in digital & physical spaces.' },
    { icon: Feather, title: 'Poetic Detail', desc: 'Infusing every shot and element with emotional resonance.' },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Image Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="ph-frame w-full max-w-md aspect-[4/5] relative rounded-3xl border border-pinkCustom/30 shadow-2xl group overflow-hidden">
            <img
              src={ABOUT_DATA.aboutImage}
              alt="About Sophia"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bgDeep/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right Column: Narrative & Highlights */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-pinkCustom-soft uppercase mb-3">
            <span className="w-6 h-px bg-pinkCustom-soft" />
            <span>{ABOUT_DATA.eyebrow}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            {ABOUT_DATA.title}
          </h2>

          <div className="space-y-4 text-textMuted text-base sm:text-lg leading-relaxed mb-8">
            <p>{ABOUT_DATA.bioParagraph1}</p>
            <p>{ABOUT_DATA.bioParagraph2}</p>
          </div>

          {/* Quote Box */}
          <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-pinkCustom backdrop-blur-md mb-8">
            <p className="font-serif italic text-lg sm:text-xl text-textLight">
              {ABOUT_DATA.quote}
            </p>
          </div>

          {/* Key Strengths Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-pinkCustom/40 transition-all duration-300 flex items-start gap-3.5 group"
                >
                  <div className="p-2.5 rounded-xl bg-purpleCustom/20 text-pinkCustom group-hover:bg-gradient-to-r group-hover:from-purpleCustom group-hover:to-pinkCustom group-hover:text-white transition-all duration-300">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-0.5">{item.title}</h4>
                    <p className="text-xs text-textMuted leading-normal">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

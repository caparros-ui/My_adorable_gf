import React, { useEffect, useRef, useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { Award, CheckCircle2 } from 'lucide-react';

export const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const tags = [
    'Photography', 'Figma', 'Adobe Creative Cloud', 'React & TypeScript',
    'Tailwind CSS', 'Color Grading', 'Brand Identity', '3D Motion',
    'Creative Direction', 'Typography', 'Lightroom'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading & Skill Bars */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-pinkCustom-soft uppercase mb-3">
            <span className="w-6 h-px bg-pinkCustom-soft" />
            <span>Expertise &amp; Capabilities</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Core Skills &amp; Proficiency
          </h2>

          <p className="text-textMuted text-base mb-10 max-w-xl">
            A comprehensive balance of creative visual artistry, technical design mastery, and digital craftsmanship.
          </p>

          <div className="space-y-6">
            {SKILLS_DATA.map((skill) => (
              <div key={skill.id} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pinkCustom" />
                    {skill.name}
                  </span>
                  <span className="font-serif text-pinkCustom-soft font-bold">
                    {skill.percentage}%
                  </span>
                </div>

                {/* Bar Track */}
                <div className="h-2.5 rounded-full bg-white/10 overflow-hidden relative">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purpleCustom to-pinkCustom shadow-[0_0_14px_rgba(236,72,153,0.6)] transition-all duration-1000 ease-out"
                    style={{
                      width: isVisible ? `${skill.percentage}%` : '0%',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Skill Tag Cloud & Highlight Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-purpleCustom to-pinkCustom text-white shadow-lg">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Toolbox &amp; Frameworks</h3>
                <p className="text-xs text-pinkCustom-soft">Technologies &amp; Creative Platforms</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-2 rounded-xl bg-white/5 border border-pinkCustom/20 text-xs font-medium text-textLight hover:bg-pinkCustom/20 hover:border-pinkCustom transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

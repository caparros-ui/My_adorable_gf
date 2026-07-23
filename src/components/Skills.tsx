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
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase mb-3">
            <span className="w-6 h-px bg-accent" />
            <span>Expertise &amp; Capabilities</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Core Skills &amp; Proficiency
          </h2>

          <p className="text-text-muted text-base mb-10 max-w-xl">
            A comprehensive balance of creative visual artistry, technical design mastery, and digital craftsmanship.
          </p>

          <div className="space-y-6">
            {SKILLS_DATA.map((skill) => (
              <div key={skill.id} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-text-primary flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    {skill.name}
                  </span>
                  <span className="font-serif text-accent font-bold">
                    {skill.percentage}%
                  </span>
                </div>

                {/* Bar Track */}
                <div className="h-2.5 rounded-full bg-bg border border-border overflow-hidden relative">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-1000 ease-out"
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
          <div className="p-8 rounded-3xl bg-surface border border-border shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-accent text-bg shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-text-primary">Toolbox &amp; Frameworks</h3>
                <p className="text-xs text-accent">Technologies &amp; Creative Platforms</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-2 rounded-xl bg-bg border border-border text-xs font-medium text-text-primary hover:border-accent transition-all duration-300 cursor-default"
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

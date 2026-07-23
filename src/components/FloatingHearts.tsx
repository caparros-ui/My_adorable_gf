import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface ParticleHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<ParticleHeart[]>([]);

  useEffect(() => {
    // Generate initial floating hearts
    const colors = ['#ec4899', '#f43f5e', '#d946ef', '#c084fc', '#a855f7'];
    const initial: ParticleHeart[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 95,
      y: Math.random() * 100,
      size: Math.floor(Math.random() * 16) + 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 8 + 6,
    }));
    setHearts(initial);

    // Spawn floating heart on user click anywhere
    const handleClick = (e: MouseEvent) => {
      // Avoid spawning inside buttons or input fields if needed, but click hearts feel great!
      const newHeart: ParticleHeart = {
        id: Date.now(),
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
        size: Math.floor(Math.random() * 20) + 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 3,
      };

      setHearts((prev) => [...prev.slice(-25), newHeart]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute transition-all duration-1000 ease-out"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            animation: `float ${h.duration}s ease-in-out infinite`,
            opacity: 0.25,
          }}
        >
          <Heart
            size={h.size}
            fill={h.color}
            color={h.color}
            className="filter drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
          />
        </div>
      ))}
    </div>
  );
};

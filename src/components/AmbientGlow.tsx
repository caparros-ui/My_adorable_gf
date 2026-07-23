import React, { useEffect, useState } from 'react';

export const AmbientGlow: React.FC = () => {
  const [position, setPosition] = useState({ x: -300, y: -300 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Dynamic Cursor Light Follower */}
      <div
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 filter blur-[80px] transition-transform duration-300 ease-out hidden md:block"
        style={{
          transform: `translate(${position.x - 300}px, ${position.y - 300}px)`,
          background: 'radial-gradient(circle, rgba(236,72,153,0.18), transparent 70%)',
        }}
      />
      {/* Background Decorative Mesh Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purpleCustom/20 blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-pinkCustom/15 blur-[150px] pointer-events-none z-0" />
    </>
  );
};

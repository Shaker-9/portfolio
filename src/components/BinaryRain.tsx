import React, { useEffect, useState } from 'react';

const BinaryRain: React.FC = () => {
  const [drops, setDrops] = useState<Array<{ id: number; x: number; chars: string[]; speed: number; offset: number }>>([]);

  useEffect(() => {
    const generateDrops = () => {
      try {
        const newDrops = [];
        // Adjust drop count based on screen size
        const dropCount = window.innerWidth < 768 ? 40 : 80;
        for (let i = 0; i < dropCount; i++) {
          const chars = [];
          // Shorter chains on mobile for better performance
          const chainLength = window.innerWidth < 768 ? 15 : 30;
          for (let j = 0; j < chainLength; j++) {
            chars.push(Math.random() > 0.5 ? '1' : '0');
          }
          newDrops.push({
            id: i,
            x: Math.random() * 100,
            chars,
            speed: 3 + Math.random() * 4, // Random speed between 3-7 seconds
            offset: Math.random() * 100 // Random starting position
          });
        }
        setDrops(newDrops);
      } catch (error) {
        console.error('Error generating binary drops:', error);
        setDrops([]);
      }
    };

    generateDrops();
    
    // Regenerate drops periodically to keep variety
    const interval = setInterval(() => {
      generateDrops();
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute text-green-400 text-xs md:text-sm font-mono opacity-30 md:opacity-40"
          style={{
            left: `${drop.x}%`,
            top: `-${drop.offset}%`,
            animation: `matrix-rain-continuous ${drop.speed}s linear infinite`
          }}
        >
          {drop.chars.map((char, index) => (
            <div key={index} className="block leading-4 mb-1">
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BinaryRain;
import React, { useEffect, useState } from 'react';

const BinaryRain: React.FC = () => {
  const [drops, setDrops] = useState<Array<{ id: number; x: number; chars: string[]; speed: number; offset: number; blinkStates: boolean[]; glowStates: boolean[] }>>([]);

  useEffect(() => {
    const generateDrops = () => {
      try {
        const newDrops = [];
        // Reduced drop count for smoother performance
        const dropCount = window.innerWidth < 768 ? 25 : 50;
        for (let i = 0; i < dropCount; i++) {
          const chars = [];
          const blinkStates = [];
          const glowStates = [];
          // Shorter chains for smoother motion
          const chainLength = window.innerWidth < 768 ? 12 : 20;
          for (let j = 0; j < chainLength; j++) {
            chars.push(Math.random() > 0.5 ? '1' : '0');
            blinkStates.push(Math.random() > 0.8); // 20% chance of blinking for smoother look
            glowStates.push(Math.random() > 0.85); // 15% chance of glowing for subtle effect
          }
          newDrops.push({
            id: i,
            x: Math.random() * 100,
            chars,
            speed: 6 + Math.random() * 4, // Slower speed range 6-10 seconds for smoother motion
            offset: Math.random() * 100, // Random starting position
            blinkStates,
            glowStates
          });
        }
        setDrops(newDrops);
      } catch (error) {
        console.error('Error generating binary drops:', error);
        setDrops([]);
      }
    };

    generateDrops();
    
    // Longer regeneration interval for smoother experience
    const interval = setInterval(() => {
      generateDrops();
    }, 30000); // 30 seconds for less frequent updates
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute text-green-400 text-xs md:text-sm font-mono opacity-25 md:opacity-35"
          style={{
            left: `${drop.x}%`,
            top: `-${drop.offset}%`,
            animation: `matrix-rain-continuous ${drop.speed}s linear infinite`
          }}
        >
          {drop.chars.map((char, index) => (
            <div 
              key={index} 
              className={`block leading-5 mb-1 transition-opacity duration-500 ease-out ${
                drop.blinkStates[index] ? 'animate-blink' : ''
              } ${
                drop.glowStates[index] ? 'animate-shimmer' : ''
              }`}
              style={{
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1 + Math.random() * 0.5}s` // Smoother blink timing
              }}
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BinaryRain;
import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [phase, setPhase] = useState<'binary' | 'name' | 'evolution' | 'loading'>('binary');
  const [progress, setProgress] = useState(0);
  const [nameChars, setNameChars] = useState<string[]>([]);
  const [evolutionStage, setEvolutionStage] = useState(0);
  const [binaryDigits, setBinaryDigits] = useState<Array<{ id: number; char: string; x: number; y: number; opacity: number }>>([]);

  const fullName = "HIMANSHU VERMA";

  useEffect(() => {
    // Generate initial binary digits
    const generateBinaryDigits = () => {
      try {
        const digits = [];
        const digitCount = window.innerWidth < 768 ? 50 : 100;
        for (let i = 0; i < digitCount; i++) {
          digits.push({
            id: i,
            char: Math.random() > 0.5 ? '1' : '0',
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: Math.random() * 0.6 + 0.4
          });
        }
        setBinaryDigits(digits);
      } catch (error) {
        console.error('Error generating binary digits:', error);
        setBinaryDigits([]);
      }
    };

    generateBinaryDigits();

    // Update binary digits periodically
    const binaryInterval = setInterval(() => {
      setBinaryDigits(prev => prev.map(digit => ({
        ...digit,
        char: Math.random() > 0.5 ? '1' : '0',
        opacity: Math.random() * 0.6 + 0.4
      })));
    }, 200);

    // Start the loading sequence
    const startSequence = () => {
      try {
        // Phase 1: Show binary for 1 second
        setTimeout(() => {
          setPhase('name');
          
          // Build name character by character
          let charIndex = 0;
          const nameInterval = setInterval(() => {
            if (charIndex <= fullName.length) {
              setNameChars(fullName.slice(0, charIndex).split(''));
              charIndex++;
            } else {
              clearInterval(nameInterval);
              
              // Phase 2: Evolution animation
              setTimeout(() => {
                setPhase('evolution');
                let stage = 0;
                const evolutionInterval = setInterval(() => {
                  setEvolutionStage(stage);
                  stage++;
                  if (stage > 4) {
                    clearInterval(evolutionInterval);
                    
                    // Phase 3: Loading bar
                    setTimeout(() => {
                      setPhase('loading');
                      let currentProgress = 0;
                      const progressInterval = setInterval(() => {
                        currentProgress += 4;
                        setProgress(currentProgress);
                        if (currentProgress >= 100) {
                          clearInterval(progressInterval);
                          clearInterval(binaryInterval);
                          setTimeout(() => {
                            onLoadComplete();
                          }, 500);
                        }
                      }, 60);
                    }, 300);
                  }
                }, 400);
              }, 800);
            }
          }, 120);
        }, 1000);
      } catch (error) {
        console.error('Error in loading sequence:', error);
        // Fallback: skip to completion
        setTimeout(() => onLoadComplete(), 1000);
      }
    };

    startSequence();

    // Fallback: Complete loading after 6 seconds no matter what
    const fallbackTimeout = setTimeout(() => {
      clearInterval(binaryInterval);
      onLoadComplete();
    }, 6000);

    return () => {
      clearInterval(binaryInterval);
      clearTimeout(fallbackTimeout);
    };
  }, [onLoadComplete]);

  const getEvolutionEmoji = () => {
    switch (evolutionStage) {
      case 0: return '👶';
      case 1: return '🧒';
      case 2: return '👨‍🎓';
      case 3: return '👨‍💻';
      case 4: return '🔐';
      default: return '🔐';
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 font-mono overflow-hidden">
      {/* Binary digits background */}
      <div className="absolute inset-0 overflow-hidden">
        {binaryDigits.map((digit) => (
          <div
            key={digit.id}
            className="absolute text-green-400 text-sm md:text-base font-mono select-none pointer-events-none"
            style={{
              left: `${digit.x}%`,
              top: `${digit.y}%`,
              opacity: digit.opacity,
              transform: `translateY(${Math.sin(Date.now() * 0.001 + digit.id) * 10}px)`,
              transition: 'opacity 0.2s ease-in-out'
            }}
          >
            {digit.char}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="text-center z-10 relative px-4 w-full max-w-4xl">
        {/* Loading indicator for binary phase */}
        {phase === 'binary' && (
          <div className="mb-8">
            <div className="text-green-400 text-lg md:text-xl animate-pulse">
              INITIALIZING...
            </div>
            <div className="mt-4 flex justify-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}

        {/* Name Building Animation */}
        {(phase === 'name' || phase === 'evolution' || phase === 'loading') && (
          <div className="mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-green-400 min-h-[40px] md:min-h-[60px] flex items-center justify-center">
              <span className="tracking-wide md:tracking-wider text-center break-words">
                {nameChars.map((char, index) => (
                  <span
                    key={index}
                    className="inline-block opacity-0 animate-fade-in"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'forwards',
                      textShadow: '0 0 20px #61be43, 0 0 40px #61be43'
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
                {phase === 'name' && nameChars.length < fullName.length && (
                  <span className="animate-pulse text-green-300 ml-1">_</span>
                )}
              </span>
            </h1>
          </div>
        )}

        {/* Evolution Animation */}
        {(phase === 'evolution' || phase === 'loading') && (
          <div className="mb-8 md:mb-12 h-16 md:h-24 flex items-center justify-center">
            <div className="relative">
              <div 
                className="text-3xl md:text-5xl transition-all duration-500 transform"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(97, 190, 67, 0.8))',
                  transform: `scale(${1 + evolutionStage * 0.1})`
                }}
              >
                {getEvolutionEmoji()}
              </div>
              {phase === 'evolution' && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="text-green-400 text-xs md:text-sm animate-pulse">
                    Evolving...
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading Bar */}
        {phase === 'loading' && (
          <div className="w-full max-w-md mx-auto">
            <div className="h-3 md:h-4 bg-gray-900 rounded-full overflow-hidden border border-green-400 shadow-lg shadow-green-400/30">
              <div 
                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-600 transition-all duration-100 ease-out relative rounded-full"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-full"></div>
              </div>
            </div>
            <div className="mt-3 text-green-400 text-xs md:text-sm animate-pulse text-center">
              <span>{'>'}</span> Loading Hacker Console... {progress}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
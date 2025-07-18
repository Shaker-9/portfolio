import React, { useState, useEffect } from 'react';
import { Monitor, Cpu, Zap } from 'lucide-react';

const AIBot: React.FC = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [eyeGlow, setEyeGlow] = useState(false);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setIsTyping(prev => !prev);
    }, 2000);

    const glowInterval = setInterval(() => {
      setEyeGlow(prev => !prev);
    }, 1500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(glowInterval);
    };
  }, []);

  return (
    <div className="fixed bottom-2 right-2 md:bottom-4 md:right-4 z-30">
      <div className="bg-gray-900 border border-green-400 rounded-lg p-2 md:p-4 shadow-2xl">
        <div className="flex items-center space-x-1 md:space-x-2">
          {/* Bot Head */}
          <div className="relative">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-800 rounded-full border-2 border-green-400 flex items-center justify-center">
              <Cpu className="w-4 h-4 md:w-6 md:h-6 text-green-400" />
            </div>
            {/* Eyes */}
            <div className="absolute top-1 left-1 md:top-2 md:left-2 flex space-x-1">
              <div className={`w-1 h-1 rounded-full ${eyeGlow ? 'bg-green-400' : 'bg-gray-600'} transition-colors duration-300`}></div>
              <div className={`w-1 h-1 rounded-full ${eyeGlow ? 'bg-green-400' : 'bg-gray-600'} transition-colors duration-300`}></div>
            </div>
          </div>
          
          {/* Desk Setup */}
          <div className="flex flex-col space-y-1">
            <Monitor className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
            <Zap className={`w-2 h-2 md:w-3 md:h-3 ${isTyping ? 'text-yellow-400' : 'text-gray-600'} transition-colors duration-300`} />
          </div>
        </div>
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="mt-1 md:mt-2 text-xs text-green-400 font-mono">
            <span className="animate-pulse">Analyzing...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIBot;
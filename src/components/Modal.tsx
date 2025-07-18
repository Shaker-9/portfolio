import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import BinaryRain from './BinaryRain';
import AIBot from './AIBot';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setVisibleLines(0);
      const interval = setInterval(() => {
        setVisibleLines(prev => {
          if (prev >= content.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isOpen, content.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-90" onClick={onClose}></div>
      
      {/* Binary Rain Background */}
      <BinaryRain />
      
      {/* AI Bot */}
      <AIBot />
      
      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="relative bg-gray-900 border-2 border-green-400 rounded-lg p-4 md:p-8 max-w-4xl max-h-[85vh] md:max-h-[80vh] overflow-y-auto mx-4 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 text-green-400 hover:text-red-400 transition-colors duration-200 z-10"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>
        
        <h2 className="text-lg md:text-2xl font-mono font-bold text-green-400 mb-4 md:mb-6 border-b border-green-400 pb-2 pr-8">
          {title}
        </h2>
        
        <div className="space-y-3 md:space-y-4">
          {content.slice(0, visibleLines).map((line, index) => (
            <div
              key={index}
              className="text-green-400 font-mono text-xs md:text-sm leading-relaxed animate-fade-in break-words"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-green-600 mr-2">{'>'}</span>
              {line}
              {index === visibleLines - 1 && (
                <span className="animate-pulse ml-1">_</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
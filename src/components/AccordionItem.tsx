import React from 'react';
import { ChevronRight } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, isActive, onClick }) => {
  return (
    <div
      className={`
        border-2 border-green-400 rounded-lg p-3 md:p-4 mb-3 md:mb-4 cursor-pointer transition-all duration-300
        ${isActive ? 'bg-green-400 bg-opacity-10 shadow-lg shadow-green-400/50' : 'bg-gray-900 hover:bg-gray-800'}
        hover:border-green-300 hover:shadow-lg hover:shadow-green-400/30
      `}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-green-400 font-mono text-sm md:text-lg font-bold">
          [ {title} ]
        </h3>
        <ChevronRight 
          className={`w-4 h-4 md:w-5 md:h-5 text-green-400 transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`}
        />
      </div>
    </div>
  );
};

export default AccordionItem;
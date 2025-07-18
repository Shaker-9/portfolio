import React from 'react';
import { Mail, Linkedin, X } from 'lucide-react';

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPanel: React.FC<ContactPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
      
      <div className="relative bg-gray-900 border-2 border-green-400 rounded-lg p-4 md:p-8 mx-4 max-w-lg w-full shadow-2xl animate-float">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 text-green-400 hover:text-red-400 transition-colors duration-200"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>
        
        <h2 className="text-lg md:text-2xl font-mono font-bold text-green-400 mb-4 md:mb-6 text-center pr-8">
          CONTACT_PROTOCOLS
        </h2>
        
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <a
            href="mailto:himanshu21112007@gmail.com"
            className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-800 border border-green-400 rounded-lg hover:bg-gray-700 hover:border-green-300 transition-all duration-300 hover:scale-105"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 md:w-6 md:h-6 text-black" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-green-400 font-mono text-xs md:text-sm">EMAIL</div>
              <div className="text-white text-xs break-all">himanshu21112007@gmail.com</div>
            </div>
          </a>
          
          <a
            href="https://linkedin.com/in/himanshu-verma-ethical-hacker"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-800 border border-green-400 rounded-lg hover:bg-gray-700 hover:border-green-300 transition-all duration-300 hover:scale-105"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-green-400 font-mono text-xs md:text-sm">LINKEDIN</div>
              <div className="text-white text-xs">Connect with me</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPanel;
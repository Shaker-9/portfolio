import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import AccordionItem from './components/AccordionItem';
import Modal from './components/Modal';
import ContactPanel from './components/ContactPanel';

const portfolioData = {
  about: [
    "SYSTEM_PROFILE: Himanshu Verma",
    "STATUS: Active Developer | Ethical Hacker | AI Enthusiast",
    "OBJECTIVE: Pursuing Bachelor of Technology in Computer Science and Engineering",
    "INSTITUTION: Vivekananda Global University",
    "SPECIALIZATION: AI + Robotics + Cybersecurity Integration",
    "CURRENT_STATUS: Undergraduate Student",
    "MISSION: Building secure, intelligent systems for the future"
  ],
  education: [
    "ACADEMIC_RECORD:",
    "→ Degree: Bachelor of Technology",
    "→ Field: Computer Science and Engineering",
    "→ Institution: Vivekananda Global University",
    "→ Status: Currently Pursuing",
    "→ Focus Areas: AI, Robotics, Cybersecurity",
    "→ Academic Standing: Active Student"
  ],
  skills: [
    "TECHNICAL_ARSENAL:",
    "→ MASTERED:",
    "  • Docker - Containerization Expert",
    "  • Linux - System Administration",
    "  • Jenkins - CI/CD Pipeline Automation",
    "  • Kubernetes - Container Orchestration",
    "  • Git - Version Control Master",
    "  • Web Development - Full Stack",
    "→ LEARNING:",
    "  • C Programming - System Level",
    "  • Python - AI/ML Applications"
  ],
  experience: [
    "PROFESSIONAL_EXPERIENCE:",
    "→ Role: Intern & Trainee",
    "→ Organization: LWIndia",
    "→ Type: Internship cum Training Program",
    "→ Focus: DevOps & Cloud Technologies",
    "→ Duration: Professional Development Phase",
    "→ Skills Acquired: Industry Best Practices"
  ],
  projects: [
    "PROJECT_PORTFOLIO:",
    "→ PRIMARY_PROJECT:",
    "  • Name: CI/CD Pipeline Integrated Application",
    "  • Technologies: Jenkins, Docker, GitHub",
    "  • Description: Automated deployment pipeline",
    "  • Features: Continuous Integration & Deployment",
    "  • Impact: Streamlined development workflow",
    "  • Status: Successfully Implemented",
    "→ SECONDARY_PROJECT:",
    "  • Name: Cybersecurity Assessment Tool",
    "  • Technologies: Python, Linux, Docker",
    "  • Description: Automated security scanning",
    "  • Features: Vulnerability Detection",
    "  • Impact: Enhanced security protocols",
    "  • Status: In Development",
    "→ TERTIARY_PROJECT:",
    "  • Name: AI-Powered Portfolio Website",
    "  • Technologies: React, TypeScript, Tailwind",
    "  • Description: Interactive portfolio with AI elements",
    "  • Features: Dynamic animations, Responsive design",
    "  • Impact: Professional online presence",
    "  • Status: Live Production"
  ]
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showContactPanel, setShowContactPanel] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isCompact, setIsCompact] = useState(false);

  // Count projects dynamically
  const projectCount = portfolioData.projects.filter(line => line.includes('→')).length;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Trigger compact mode when scrolled down 300px
      if (currentScrollY > 300 && !isCompact) {
        setIsCompact(true);
      } else if (currentScrollY <= 300 && isCompact) {
        setIsCompact(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCompact]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const handleAccordionClick = (section: string) => {
    if (section === 'contact') {
      setShowContactPanel(true);
    } else {
      setActiveModal(section);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const closeContactPanel = () => {
    setShowContactPanel(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadComplete={handleLoadComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Hero Content */}
        <div 
          className={`
            transition-all duration-1000 ease-out transform
            ${isCompact 
              ? 'fixed top-4 right-4 z-30 scale-50 origin-center' 
              : 'relative scale-100'
            }
          `}
        >
          <div className="text-center">
            {/* Jarvis-style circular rings around photo */}
            <div className="relative mt-12 mb-16 flex justify-center">
              <div className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center">
                {/* Outer ring */}
                <div className="absolute inset-4 md:inset-6 border-2 border-green-400 rounded-full animate-spin-slow opacity-60"></div>
                {/* Middle ring */}
                <div className="absolute inset-8 md:inset-10 border border-green-300 rounded-full animate-spin-reverse opacity-80"></div>
                {/* Inner ring */}
                <div className="absolute inset-16 md:inset-20 border border-green-500 rounded-full opacity-90"></div>
                {/* Scanning lines */}
                <div className="absolute inset-0 border-t-2 border-transparent border-t-green-400 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-r-2 border-transparent border-r-green-300 rounded-full animate-spin-reverse"></div>
                <div className="absolute inset-6 border-b-2 border-transparent border-b-green-500 rounded-full animate-spin-slow"></div>
                
                {/* Photo section - perfectly centered */}
                <div className="relative z-10 w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-green-400 shadow-2xl shadow-green-400/50 flex items-center justify-center mb-12 overflow-hidden">
                  <img src="/profile.jpg" alt="Profile Photo" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Name */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-mono font-bold text-green-400 mb-4 animate-shimmer">
              HIMANSHU VERMA
            </h1>
            
            {/* Role Description */}
            <div className="text-green-300 font-mono text-sm md:text-lg mb-8 space-y-1">
              <div>AI/ML Engineer | Full Stack Developer | DevOps Practitioner</div>
            </div>
            
            {/* Stats - Only show when not compact */}
            <div className={`flex flex-wrap justify-center gap-6 md:gap-12 text-center transition-opacity duration-1000 ${isCompact ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <div className="bg-gray-900 border border-green-400 rounded-lg p-4 min-w-[120px] hover:bg-gray-800 transition-all duration-300">
                <div className="text-2xl md:text-3xl font-bold text-green-400 font-mono">{projectCount}</div>
                <div className="text-green-300 text-xs md:text-sm font-mono">PROJECTS</div>
              </div>
              
              <div className="bg-gray-900 border border-green-400 rounded-lg p-4 min-w-[120px] hover:bg-gray-800 transition-all duration-300">
                <div className="text-2xl md:text-3xl font-bold text-green-400 font-mono">6+</div>
                <div className="text-green-300 text-xs md:text-sm font-mono">MONTHS EXP</div>
              </div>
              
              <div className="bg-gray-900 border border-green-400 rounded-lg p-4 min-w-[120px] hover:bg-gray-800 transition-all duration-300">
                <div className="text-2xl md:text-3xl font-bold text-green-400 font-mono">8+</div>
                <div className="text-green-300 text-xs md:text-sm font-mono">TECHNOLOGIES</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-opacity duration-1000 ${isCompact ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="text-green-400 font-mono text-sm mb-2">SCROLL DOWN</div>
          <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className={`min-h-screen transition-all duration-1000 ${isCompact ? 'pt-20' : 'pt-0'}`}>
        <div className="flex items-center justify-center min-h-screen px-4 py-20">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-8">
              <div className="text-green-400 font-mono text-sm mb-2">
                <span className="animate-pulse">{'>'}</span> PORTFOLIO_SYSTEM_ACTIVE
              </div>
              <div className="text-green-400 font-mono text-xs opacity-70">
                SELECT_MODULE_TO_ACCESS
              </div>
            </div>

            {/* Accordion Menu */}
            <div className="space-y-4">
              <AccordionItem
                title="ABOUT"
                isActive={activeModal === 'about'}
                onClick={() => handleAccordionClick('about')}
              />
              <AccordionItem
                title="EDUCATION"
                isActive={activeModal === 'education'}
                onClick={() => handleAccordionClick('education')}
              />
              <AccordionItem
                title="TECHNICAL_SKILLS"
                isActive={activeModal === 'skills'}
                onClick={() => handleAccordionClick('skills')}
              />
              <AccordionItem
                title="EXPERIENCE"
                isActive={activeModal === 'experience'}
                onClick={() => handleAccordionClick('experience')}
              />
              <AccordionItem
                title="PROJECTS"
                isActive={activeModal === 'projects'}
                onClick={() => handleAccordionClick('projects')}
              />
              <AccordionItem
                title="CONTACT"
                isActive={showContactPanel}
                onClick={() => handleAccordionClick('contact')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal && (
        <Modal
          isOpen={!!activeModal}
          onClose={closeModal}
          title={activeModal.toUpperCase()}
          content={portfolioData[activeModal as keyof typeof portfolioData] || []}
        />
      )}

      {/* Contact Panel */}
      <ContactPanel
        isOpen={showContactPanel}
        onClose={closeContactPanel}
      />
    </div>
  );
}

export default App;
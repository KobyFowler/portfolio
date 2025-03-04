import React, { useCallback, useEffect, useState } from 'react';
import { CircuitBoard, Briefcase, Github, Linkedin } from 'lucide-react';

const Navbar = ({ activeSection }) => {
  // ... rest of the component code
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navItems = ["Resume", "Projects", "Experience", "Skills", "Contact"];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
                ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 group">
              <CircuitBoard className="w-8 h-8 text-blue-500 group-hover:animate-spin" />
              <span className="font-bold text-xl">Koby Fowler</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative group py-2
                    ${activeSection === item.toLowerCase() 
                      ? 'text-blue-400' 
                      : 'text-gray-300 hover:text-blue-400'}`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 
                    transform origin-left transition-transform duration-300
                    ${activeSection === item.toLowerCase()
                      ? 'scale-x-100 bg-blue-400'
                      : 'scale-x-0 bg-blue-400 group-hover:scale-x-100'}`} 
                  />
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/KobyFowler"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link group"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5 transform group-hover:scale-110" />
              </a>
              <a
                href="https://linkedin.com/in/koby-fowler"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link group"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5 transform group-hover:scale-110" />
              </a>
              <a
                href="#resume"
                className="hidden md:flex items-center gap-2 px-4 py-2 
                         bg-blue-500/10 hover:bg-blue-500/20 rounded-full
                         transition-all duration-300"
              >
                <Briefcase className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
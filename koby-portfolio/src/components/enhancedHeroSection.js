import React, { useState, useEffect, useRef } from 'react';
import {
  CircuitBoard, ArrowRight, Download, ChevronDown,
  Monitor, Code, Coffee, Star, Terminal, Globe
} from 'lucide-react';

// Animated Typing Effect Component
const TypeWriter = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const word = words[currentWordIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(word.substring(0, currentText.length + 1));
      } else {
        setCurrentText(word.substring(0, currentText.length - 1));
      }
      
      if (!isDeleting && currentText === word) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }, typeSpeed);
    
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words]);
  
  return (
    <span className="text-blue-400">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Enhanced Hero Section
const EnhancedHeroSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const position = window.scrollY;
      setScrollPosition(position);
      setIsVisible(position < window.innerHeight);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollPosition * 0.5}px)`,
    opacity: Math.max(0, 1 - scrollPosition / 700)
  };

  return (
    <header ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 
                    animate-gradient" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.1
            }}
          >
            <Code className="w-6 h-6 text-blue-500" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10" style={parallaxStyle}>
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Profile Section */}
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 group-hover:opacity-30 
                          transition-opacity duration-500" />
            <div className="relative">
              <img
                src={`${process.env.PUBLIC_URL}/profile-photo.jpg`}
                alt="Koby Fowler"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500/30
                         transform transition-transform duration-500 group-hover:scale-110
                         shadow-lg shadow-blue-500/20"
              />
            </div>
          </div>

          {/* Animated Text */}
          <div className="space-y-6">
            <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent 
                         bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600">
              Hello, I'm Koby Fowler
            </h1>
            <h2 className="text-3xl text-gray-300">
              I'm a{' '}
              <TypeWriter
                words={[
                  "Software Engineer",
                  "Problem Solver",
                  "Full Stack Developer",
                  "Tech Enthusiast"
                ]}
              />
            </h2>
          </div>

          {/* Skill Tags */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: <Monitor />, text: "Full Stack" },
              { icon: <Terminal />, text: "Clean Code" },
              { icon: <Globe />, text: "Cloud Native" },
              { icon: <Star />, text: "Team Player" }
            ].map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full
                         transform hover:scale-110 transition-all duration-300
                         hover:bg-blue-500/20 cursor-pointer group"
              >
                <span className="text-blue-400 group-hover:rotate-12 transition-transform duration-300">
                  {skill.icon}
                </span>
                <span className="text-gray-300">{skill.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 
                           rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                           transition-opacity duration-300" />
              <span className="relative flex items-center gap-3 text-white">
                <Terminal className="w-5 h-5 group-hover:animate-pulse" />
                <span>View Projects</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
              </span>
            </button>

            <button className="group px-8 py-4 bg-gray-800/50 backdrop-blur-lg rounded-xl
                           border border-gray-700 hover:border-blue-500 transform hover:scale-105 
                           transition-all duration-300">
              <span className="flex items-center gap-3 text-white">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span>Download Resume</span>
              </span>
            </button>
          </div>

          {/* Scroll Indicator */}
          {isVisible && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="animate-bounce flex flex-col items-center text-gray-400">
                <ChevronDown className="w-6 h-6" />
                <span className="text-sm">Scroll to explore</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default EnhancedHeroSection;
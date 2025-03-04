// React and hooks first
import React, { useState, useEffect, Suspense } from 'react';

// Third-party imports
import { 
  CircuitBoard, Terminal, Github, Linkedin, Mail,
  Rocket, Building2, Cpu, Download, Loader, 
  Globe, Books, Award, ArrowRight, FileText, 
  BookOpen, ScrollText, Moon, Sun, ArrowUp, 
  Briefcase, Code, Coffee, Monitor, Star
} from 'lucide-react';

// Local components
import { Alert, AlertDescription } from './components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { ContactForm } from './components/ui/contact-form';
import { EssaysSection } from './components/ui/essays-section';
import { OpenMCTSection } from './components/ui/openmct-section';
import Navbar from './components/Navbar';

// New imported components
import ProjectShowcase from './components/ProjectShowcase';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsSection from './components/SkillsSection';
import CharacterAnimation from './components/CharacterAnimation';

// Lazy loaded components
const EnhancedHeroSection = React.lazy(() => import('./components/enhancedHeroSection'));
const ParticleBackground = React.lazy(() => import('./components/ParticleBackground'));
const EnhancedResumeViewer = React.memo(React.lazy(() => import('./components/resumeViewer')));
// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h2 className="text-xl text-red-500">Something went wrong</h2>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-blue-500 rounded-lg"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading Screen Component with proper cleanup
const LoadingScreen = ({ progress = 0 }) => (
  <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
    <div className="space-y-6 text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse" />
        <CircuitBoard className="w-20 h-20 text-blue-500 relative" />
      </div>
      <div className="space-y-3">
        <p className="text-blue-400 animate-pulse text-xl font-bold">
          Building Experience...
        </p>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          />
        </div>
        <p className="text-gray-500 text-sm">{Math.round(progress)}%</p>
      </div>
    </div>
  </div>
);

// Animated Text Component with proper cleanup
const AnimatedText = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });
    
    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                ${className}`}
    >
      {children}
    </div>
  );
};

// Theme Toggle with persisted state
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark));
    document.documentElement.classList.toggle('light-theme', !isDark);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-20 right-8 p-3 bg-gray-800/50 backdrop-blur-sm rounded-full
                shadow-lg hover:bg-gray-700 transition-all duration-300 z-50"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
};

// Scroll to Top with proper throttling
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId;
    
    const toggleVisibility = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        setIsVisible(window.pageYOffset > 500);
      }, 100);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-8 p-3 bg-blue-500 text-white rounded-full
                shadow-lg hover:bg-blue-600 transition-all duration-300 z-50
                ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

// Main App Component with proper state management and error handling
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let mounted = true;
    let intervalId;

    const startLoading = () => {
      intervalId = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(intervalId);
            if (mounted) {
              setTimeout(() => setIsLoading(false), 500);
            }
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    };

    startLoading();

    return () => {
      mounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen progress={100} />}>
          <ParticleBackground />
        </Suspense>

        <div className="relative z-10">
          <Navbar activeSection={activeSection} />
          <ThemeToggle />
          <ScrollToTop />

          <main className="pt-16">
            <ErrorBoundary>
              <Suspense fallback={<LoadingScreen progress={100} />}>
                <EnhancedHeroSection />
              </Suspense>
            </ErrorBoundary>

            {/* Character Animation Section */}
            <section className="py-20 flex justify-center">
              <CharacterAnimation />
            </section>

            {/* Resume Section */}
            <section id="resume" className="py-20 relative">
  <div className="container mx-auto px-6 relative">
    <AnimatedText>
      <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
        <div className="p-3 bg-blue-500/20 rounded-lg">
          <Briefcase className="w-8 h-8 text-blue-400" />
        </div>
        Professional Resume
      </h2>
      <Alert className="mb-8 bg-blue-500/10 border-blue-500/20">
        <AlertDescription>
          View my complete professional experience and qualifications below.
        </AlertDescription>
      </Alert>
    </AnimatedText>
    
    <ErrorBoundary>
      <Suspense fallback={<div className="h-[800px] flex items-center justify-center bg-gray-800/30 rounded-xl">
        <Loader className="w-12 h-12 text-blue-500 animate-spin" />
      </div>}>
        {/* Add a unique key to force remount if needed */}
        <EnhancedResumeViewer key="resume-viewer-component" />
      </Suspense>
    </ErrorBoundary>
  </div>
</section>

            {/* Projects Section */}
            <section id="projects" className="py-20 relative">
              <div className="container mx-auto px-6 relative">
                <ErrorBoundary>
                  <ProjectShowcase />
                </ErrorBoundary>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-20 relative">
              <div className="container mx-auto px-6 relative">
                <AnimatedText>
                  <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Building2 className="w-8 h-8 text-blue-400" />
                    </div>
                    Professional Journey
                  </h2>
                </AnimatedText>
                
                <ErrorBoundary>
                  <ExperienceTimeline />
                </ErrorBoundary>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 relative">
              <div className="container mx-auto px-6 relative">
                <AnimatedText>
                  <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Cpu className="w-8 h-8 text-blue-400" />
                    </div>
                    Technical Skills
                  </h2>
                </AnimatedText>
                
                <ErrorBoundary>
                  <SkillsSection />
                </ErrorBoundary>
              </div>
            </section>

            {/* Technical Essays Section */}
            <section id="essays" className="py-20 relative">
              <div className="container mx-auto px-6 relative">
                <ErrorBoundary>
                  <EssaysSection />
                </ErrorBoundary>
              </div>
            </section>

            {/* OpenMCT Section */}
            <section id="openmct" className="py-20 relative">
              <div className="container mx-auto px-6 relative">
                <ErrorBoundary>
                  <OpenMCTSection />
                </ErrorBoundary>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 relative">
              <div className="container mx-auto px-6 relative">
                <AnimatedText>
                  <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Mail className="w-8 h-8 text-blue-400" />
                    </div>
                    Get in Touch
                  </h2>
                </AnimatedText>
                
                <div className="max-w-3xl mx-auto">
                  <Card>
                    <CardContent>
                      <ErrorBoundary>
                        <ContactForm />
                      </ErrorBoundary>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </main>

          {/* Footer with improved accessibility and performance */}
          <footer className="bg-gray-800/50 py-12">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Koby Fowler</h3>
                  <p className="text-gray-400">Software Engineer crafting innovative solutions</p>
                </div>
                <nav aria-label="Footer Navigation">
                  <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    {["Resume", "Projects", "Experience", "Skills", "Essays", "Contact"].map((item) => (
                      <li key={item}>
                        <a
                          href={`#${item.toLowerCase()}`}
                          className="block text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div>
                  <h3 className="text-xl font-bold mb-4">Connect</h3>
                  <div className="flex space-x-4">
                    {[
                      {
                        href: "https://github.com/KobyFowler",
                        icon: <Github className="w-6 h-6" />,
                        label: "GitHub"
                      },
                      {href: "https://linkedin.com/in/koby-fowler",
                        icon: <Linkedin className="w-6 h-6" />,
                        label: "LinkedIn"
                      },
                      {
                        href: "mailto:kobymfowler@outlook.com",
                        icon: <Mail className="w-6 h-6" />,
                        label: "Email"
                      }
                    ].map(({ href, icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors group"
                        aria-label={label}
                      >
                        <div className="group-hover:scale-110 transition-transform">
                          {icon}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills and Focus Areas */}
              <div className="grid md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-700">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Technical Expertise</h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "React", "Node.js", "TypeScript", "AWS", 
                      "Docker", "GraphQL", "Tailwind CSS", "Next.js"
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full
                                 hover:bg-blue-500/20 hover:text-blue-300 
                                 transition-all cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Current Focus</h4>
                  <ul className="space-y-2 text-gray-400">
                    {[
                      { icon: <Code className="w-4 h-4 text-blue-400" />, text: "Full Stack Development" },
                      { icon: <Globe className="w-4 h-4 text-blue-400" />, text: "Cloud Architecture" },
                      { icon: <Terminal className="w-4 h-4 text-blue-400" />, text: "DevOps & Automation" }
                    ].map(({ icon, text }, index) => (
                      <li key={index} className="flex items-center gap-2">
                        {icon}
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Copyright & Additional Info */}
              <div className="mt-12 pt-8 border-t border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-gray-400">
                    © {new Date().getFullYear()} Koby Fowler. All rights reserved.
                  </p>
                  
                  <nav className="flex items-center gap-8">
                    <a
                      href="/privacy"
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="/terms"
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    >
                      Terms of Use
                    </a>
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="text-gray-400 hover:text-blue-400 transition-colors 
                               flex items-center gap-2 text-sm group"
                      aria-label="Back to top"
                    >
                      Back to Top
                      <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </nav>
                </div>

                {/* Version Info */}
                <div className="mt-4 text-center text-gray-500 text-sm">
                  <p>Portfolio Version 2.0.0 | Last Updated: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </footer>

          {/* Scroll Progress Indicator with debounced updates */}
          <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{
                width: (() => {
                  const scrolled = window.scrollY;
                  const height = document.documentElement.scrollHeight - window.innerHeight;
                  return height > 0 ? `${(scrolled / height) * 100}%` : '0%';
                })()
              }}
            />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
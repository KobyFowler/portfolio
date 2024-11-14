import React, { useState, useEffect, useRef } from 'react';
import { 
  CircuitBoard, Code, Cpu, Terminal, Layers, 
  Workflow, Binary, Database, Mail, Github, 
  Linkedin, ExternalLink, ChevronUp, ChevronDown,
  Sparkles, Fingerprint, Braces, Rocket,
  Globe, Books, Award, Building2, 
  ArrowRight, Download, Maximize2, Minimize2
} from 'lucide-react';

// Interactive Grid Background
const TechGrid = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    const points = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    }));
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      
      points.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;
        
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
        
        points.forEach(otherPoint => {
          const distance = Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y);
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

// Animated Text Reveal
const AnimatedText = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(textRef.current);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(textRef.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div
      ref={textRef}
      className={`transition-all duration-1000 ${
        isVisible
          ? 'opacity-100 transform translate-y-0'
          : 'opacity-0 transform translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Enhanced Hero Section
const HeroSection = () => {
  const [scrollIndicator, setScrollIndicator] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicator(false);
      } else {
        setScrollIndicator(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 group-hover:opacity-30 
                          transition-opacity duration-500" />
            <CircuitBoard className="w-32 h-32 text-blue-500 relative z-10 transform transition-transform 
                                   duration-500 group-hover:scale-110" />
          </div>
          
          <AnimatedText>
            <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r 
                         from-blue-500 via-indigo-500 to-purple-500">
              Engineering Tomorrow
            </h1>
          </AnimatedText>
          
          <AnimatedText>
            <h2 className="text-5xl text-white mb-4">
              Koby Fowler
            </h2>
          </AnimatedText>
          
          <AnimatedText>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              Software Engineer crafting innovative solutions at the intersection of technology and creativity. 
              Specializing in modern web applications, AI integration, and scalable architectures.
            </p>
          </AnimatedText>
          
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl
                           transform hover:scale-105 transition-all duration-300 text-white
                           shadow-lg hover:shadow-blue-500/50">
              <span className="flex items-center gap-3">
                <Terminal className="w-5 h-5 group-hover:animate-pulse" />
                <span>View Projects</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            
            <button className="group px-8 py-4 bg-gray-800/50 backdrop-blur-lg rounded-xl
                           transform hover:scale-105 transition-all duration-300 text-white
                           border border-gray-700 hover:border-blue-500">
              <span className="flex items-center gap-3">
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </span>
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500
                      ${scrollIndicator ? 'opacity-100' : 'opacity-0'}`}>
          <div className="animate-bounce flex flex-col items-center text-gray-400">
            <ChevronDown className="w-6 h-6" />
            <span className="text-sm">Scroll to explore</span>
          </div>
        </div>
      </div>
    </header>
  );
};

// Experience Timeline
const TimelineItem = ({ year, title, company, description, techs }) => {
  return (
    <div className="relative pl-8 py-6 group">
      <div className="absolute left-0 top-8 w-3 h-3 bg-blue-500 rounded-full 
                    transform group-hover:scale-150 transition-transform duration-300" />
      <div className="absolute left-[5px] top-9 h-full w-0.5 bg-gray-700" />
      
      <div className="space-y-3">
        <span className="text-blue-400 font-mono">{year}</span>
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 font-semibold">{company}</p>
        <p className="text-gray-500">{description}</p>
        <div className="flex flex-wrap gap-2">
          {techs.map((tech, index) => (
            <span key={index} className="px-3 py-1 bg-gray-800 text-blue-400 rounded-full text-sm 
                                    hover:bg-gray-700 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Project Showcase
const ProjectShowcase = ({ projects }) => {
  const [activeProject, setActiveProject] = useState(0);
  
  return (
    <div className="relative">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Project Navigation */}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <button
              key={index}
              className={`w-full text-left p-6 rounded-xl transition-all duration-300
                       ${activeProject === index 
                         ? 'bg-blue-600/20 border-blue-500' 
                         : 'bg-gray-800/50 hover:bg-gray-800'} 
                       border border-transparent hover:border-blue-500`}
              onClick={() => setActiveProject(index)}
            >
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-400">{project.shortDesc}</p>
            </button>
          ))}
        </div>
        
        {/* Project Details */}
        <div className="relative">
          <div className="sticky top-8 space-y-6 p-8 bg-gray-800/50 backdrop-blur-lg rounded-xl
                       border border-gray-700">
            <h3 className="text-2xl font-bold">{projects[activeProject].title}</h3>
            <p className="text-gray-400 leading-relaxed">
              {projects[activeProject].longDesc}
            </p>
            <div className="flex flex-wrap gap-2">
              {projects[activeProject].technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {projects[activeProject].links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skills Visualization
const SkillsSection = () => {
  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Next.js"] },
    { category: "Backend", items: ["Node.js", "Python", "Java", "AWS"] },
    { category: "Tools & Practices", items: ["Git", "CI/CD", "Agile", "Testing"] }
  ];
  
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {skills.map((skillGroup, index) => (
        <div key={index} className="p-6 bg-gray-800/50 backdrop-blur-lg rounded-xl
                                border border-gray-700 hover:border-blue-500 transition-colors">
          <h3 className="text-xl font-bold mb-4 text-blue-400">{skillGroup.category}</h3>
          <div className="space-y-3">
            {skillGroup.items.map((skill, skillIndex) => (
              <div key={skillIndex} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-gray-300">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Contact Form
const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <label className="text-gray-300">Name</label>
        <input
          type="text"
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-lg rounded-lg
                   border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                   transition-all duration-300"
        />
      </div>
      
      {/* Add email and message fields similarly */}
      
      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg
                 transform hover:scale-105 transition-all duration-300 text-white
                 shadow-lg hover:shadow-blue-500/50"
      >
        Send Message
      </button>
    </form>
  );
};

// Main App Component
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
        <div className="space-y-4 text-center">
          <CircuitBoard className="w-16 h-16 text-blue-500 animate-spin" />
          <p className="text-blue-400 animate-pulse">Loading experience...</p>
        </div>
      </div>
    );
  }

  const projects = [
    {
      title: "AI Schedule Planner",
      shortDesc: "Optimized course scheduling system for ISU students",
      longDesc: "Led the development of an AI-powered system that analyzes course patterns, prerequisites, and student preferences to generate optimized academic schedules. Implemented machine learning algorithms to predict course availability and student success patterns.",
      technologies: ["Python", "React", "TensorFlow", "AWS", "Node.js", "PostgreSQL"],
      links: [
        { text: "View Project", url: "#" },
        { text: "GitHub", url: "https://github.com/KobyFowler/schedule-planner" }
      ]
    },
    {
      title: "Security Access Control System",
      shortDesc: "Enterprise-level security system for John Deere",
      longDesc: "Developed and implemented robust security access control features for John Deere's global platform. Enhanced employee permission handling systems and contributed to critical audit compliance initiatives while collaborating with international teams.",
      technologies: ["Java", "Spring Boot", "OAuth", "REST APIs", "MySQL"],
      links: [
        { text: "Case Study", url: "#" }
      ]
    },
    {
      title: "Smart Calendar Integration",
      shortDesc: "IoT-based smart calendar system",
      longDesc: "Created an innovative Raspberry Pi-based smart calendar that seamlessly integrates with various data sources to display schedules, weather updates, and ISU events. Features custom 3D-printed housing and advanced display customization options.",
      technologies: ["Python", "Raspberry Pi", "IoT", "APIs", "3D Printing"],
      links: [
        { text: "Documentation", url: "#" },
        { text: "GitHub", url: "https://github.com/KobyFowler/smart-calendar" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background Elements */}
      <TechGrid />
      <div className="relative z-10">
        
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-lg z-50 transition-all duration-300">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <CircuitBoard className="w-8 h-8 text-blue-500" />
                <span className="font-bold text-xl">Koby Fowler</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                {["Projects", "Experience", "Skills", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/KobyFowler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/koby-fowler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Projects Section */}
          <section id="projects" className="py-20 bg-gray-800/50">
            <div className="container mx-auto px-6">
              <AnimatedText>
                <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
                  <Rocket className="w-8 h-8 text-blue-500" />
                  Featured Projects
                </h2>
              </AnimatedText>
              <ProjectShowcase projects={projects} />
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-20">
            <div className="container mx-auto px-6">
              <AnimatedText>
                <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-blue-500" />
                  Professional Journey
                </h2>
              </AnimatedText>
              <div className="space-y-6">
                <TimelineItem
                  year="2024 - Present"
                  title="Software Engineer"
                  company="Korio"
                  description="Leading development of customer-facing applications and implementing scalable frontend architecture."
                  techs={["React", "TypeScript", "AWS", "Node.js", "GraphQL"]}
                />
                <TimelineItem
                  year="2023"
                  title="Software Developer"
                  company="John Deere"
                  description="Developed security access control features and optimized employee permission handling systems."
                  techs={["Java", "Spring Boot", "OAuth", "REST APIs"]}
                />
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-20 bg-gray-800/50">
            <div className="container mx-auto px-6">
              <AnimatedText>
                <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
                  <Cpu className="w-8 h-8 text-blue-500" />
                  Technical Expertise
                </h2>
              </AnimatedText>
              <SkillsSection />
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20">
            <div className="container mx-auto px-6">
              <AnimatedText>
                <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
                  <Mail className="w-8 h-8 text-blue-500" />
                  Get in Touch
                </h2>
              </AnimatedText>
              <ContactForm />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800/50 py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Koby Fowler</h3>
                <p className="text-gray-400">Software Engineer crafting innovative solutions</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  {["Projects", "Experience", "Skills", "Contact"].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="block text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/KobyFowler"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/koby-fowler"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:kobymfowler@outlook.com"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>© 2024 Koby Fowler. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
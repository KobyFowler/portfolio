import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Lightbulb,
  Code, 
  Github, 
  Linkedin, 
  GraduationCap, 
  FileText, 
  Book, 
  Award,
  ChevronUp,
  ChevronDown,
  Building,
  FileSpreadsheet,
  CircuitBoard,
  Zap,
  ExternalLink
} from 'lucide-react';
import './animation.css';
import ResumeViewer from './components/resumeViewer';



// Running Figure Component
const RunningFigure = ({ isMoving, progress }) => (
  <div 
    className={`absolute top-1 transition-all duration-300`} 
    style={{ left: `calc(${progress}% - 24px)` }}
  >
    <div className={`
      p-2 rounded-full bg-blue-600 shadow-lg
      ${isMoving ? 'animate-run scale-110' : 'animate-idle'}
    `}>
      <svg 
        className="h-8 w-8 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isMoving ? (
          // Running stick figure with more detail
          <path d="M13 4a2 2 0 100-4 2 2 0 000 4zM14 8l-1 8 4 2m-6-2l3 2m-2-12l-2 3 2 3m4-6l2 3-2 3m-4-4l1 3m2-3l-1 3" />
        ) : (
          // Victory pose when idle
          <path d="M13 4a2 2 0 100-4 2 2 0 000 4zM13 7v4m-3 3l3 3 3-3m-8-4l-2 2m10-2l2 2" className="animate-victory" />
        )}
      </svg>
    </div>
  </div>
);

// Particle Background Component
const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const createParticle = () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      velocityX: (Math.random() - 0.5) * 2,
      velocityY: (Math.random() - 0.5) * 2
    });

    setParticles(Array.from({ length: 50 }, createParticle));

    const interval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + particle.velocityX + window.innerWidth) % window.innerWidth,
          y: (particle.y + particle.velocityY + window.innerHeight) % window.innerHeight
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle, index) => (
        <div
          x={index}
          className="absolute rounded-full bg-blue-500 opacity-30"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Card Components with Hover Effects
const Card = ({ children, className = '', hover = false }) => (
  <div 
    className={`
      bg-white/80 backdrop-blur-lg rounded-lg 
      shadow-lg transition-all duration-500 
      ${hover ? 'hover:shadow-2xl hover:-translate-y-2 hover:bg-white/90' : ''} 
      ${className}
    `}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-gray-200/50 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Animated Section Header
const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center space-x-3 mb-8 group">
    <div className="p-3 bg-blue-600 rounded-lg transform transition-all duration-300 group-hover:scale-110">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
      {title}
    </h2>
  </div>
);

// Enhanced ProjectCard with Modified 3D Transform
const ProjectCard = ({ title, description, role, skills, bigPicture = '', resources = [], reducedTilt = false }) => {
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const sensitivity = reducedTilt ? 40 : 20;
    const rotateX = (y - centerY) / sensitivity;
    const rotateY = -(x - centerX) / sensitivity;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'transform 0.1s'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s'
    });
  };

  return (
    <div
      className="h-full transform-gpu"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
    >
      <Card hover className="h-full flex flex-col bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="border-l-4 border-blue-600">
          <h3 className="text-xl font-semibold">{title}</h3>
        </CardHeader>
        <CardContent className="space-y-4 flex-grow">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
            <p className="text-gray-600">{description}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Role</h4>
            <p className="text-gray-600">{role}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm
                           transform transition-all duration-300 hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {bigPicture && (
            <div className="relative overflow-hidden rounded-lg p-4 bg-gradient-to-r from-blue-50 to-white">
              <h4 className="font-semibold text-gray-800 mb-2">Impact</h4>
              <p className="text-gray-600">{bigPicture}</p>
              <div className="absolute top-0 right-0 w-16 h-16 transform translate-x-8 -translate-y-8">
                <div className="absolute inset-0 bg-blue-200 opacity-20 rounded-full animate-pulse" />
              </div>
            </div>
          )}
          {resources.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Resources</h4>
              <div className="flex flex-wrap gap-2">
                {resources.map((resource, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm
                             transform transition-all duration-300 hover:bg-gray-200"
                  >
                    {resource}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Enhanced ExpandableSection with Animation
const ExpandableSection = ({ title, children, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg bg-white/80 backdrop-blur-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            {icon}
          </div>
          <h3 className="text-2xl font-semibold">{title}</h3>
        </div>
        <div className="transform transition-transform duration-300">
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-blue-600" />
          ) : (
            <ChevronDown className="w-6 h-6 text-blue-600" />
          )}
        </div>
      </button>
      <div 
        className={`transition-all duration-500 overflow-hidden
          ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Scroll to top button component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg 
                 transition-all duration-300 transform hover:scale-110 hover:bg-blue-700
                 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
};

const App = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
      
      setIsScrolling(true);
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <ParticleBackground />
      
      {/* Progress Bar with Running Figure */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
        <RunningFigure isMoving={isScrolling} progress={scrollProgress} />
      </div>

{/* Hero Section */}
<header className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-900 opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        </div>
        <div className="container mx-auto px-6 py-20 relative">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center mb-6 float-animation">
              <CircuitBoard className="w-16 h-16" />
            </div>
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              Welcome to My Engineering Portfolio
            </h1>
            <h2 className="text-3xl mb-4 animate-fade-in">Koby Fowler</h2>
            <p className="text-xl mb-8 animate-fade-in-delayed">
              Computer Engineering Graduate - Iowa State University
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href="mailto:kobymfowler@outlook.com"
                className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg
                         hover:bg-white/20 transition-all duration-300"
              >
                <Mail className="w-5 h-5 group-hover:animate-bounce" />
                <span>kobymfowler@outlook.com</span>
              </a>
              <div className="flex space-x-4">
                {[
                  { Icon: Github, href: "https://github.com/KobyFowler" },
                  { Icon: Linkedin, href: "https://linkedin.com/in/koby-fowler" }
                ].map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 
                             transition-all duration-300 transform hover:scale-110"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

{/* Professional Experience - Now with Korio */}
<section className="py-16 bg-gray-50/50 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <SectionHeader icon={Building} title="Professional Experience" />
          
          {/* Korio Experience */}
          <div className="space-y-6">
            <Card hover>
              <CardHeader className="border-l-4 border-blue-600">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <h3 className="text-xl font-semibold">Software Engineer - Korio</h3>
                  <span className="text-gray-600 text-sm mt-1 sm:mt-0">2024 - Present</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Core Responsibilities</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Lead development of customer-facing application using modern web technologies</li>
                    <li>Design and implement scalable frontend architecture and components</li>
                    <li>Collaborate with cross-functional teams to define product requirements and features</li>
                    <li>Optimize application performance and user experience</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Achievements</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Developed and launched major features in the customer portal</li>
                    <li>Implemented responsive design patterns improving mobile user experience</li>
                    <li>Reduced application load time by 40% through optimization</li>
                    <li>Established coding standards and best practices for the frontend team</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "TypeScript",
                      "Node.js",
                      "AWS",
                      "GraphQL",
                      "Tailwind CSS",
                      "Jest",
                      "CI/CD"
                    ].map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm
                                 transform transition-all duration-300 hover:scale-105 hover:bg-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* John Deere Experience */}
            <Card hover>
              <CardHeader className="border-l-4 border-blue-600">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <h3 className="text-xl font-semibold">Software Developer - John Deere</h3>
                  <span className="text-gray-600 text-sm mt-1 sm:mt-0">2023</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Duties and Projects</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Developed security access control features for global platform</li>
                    <li>Collaborated with international teams in India and Germany</li>
                    <li>Optimized employee permission handling systems</li>
                    <li>Contributed to audit compliance initiatives</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Technologies & Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Security Protocols",
                      "API Design",
                      "Java",
                      "Spring Boot",
                      "OAuth",
                      "Global Development",
                      "Technical Communication"
                    ].map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm
                                 transform transition-all duration-300 hover:scale-105 hover:bg-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Senior Design Project - with reduced tilt */}
      <section className="py-16 bg-white/50 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <SectionHeader icon={Award} title="Senior Design Project" />
          <ProjectCard
            title="AI Schedule Planner (Senior Design)"
            description="Led the development of an AI-powered course scheduling system for ISU students that analyzes course patterns, prerequisites, and preferred class times to suggest optimized schedules. The system was developed with a strong focus on accessibility and user experience."
            role="Project Lead & Full Stack Developer"
            skills={[
              "Machine Learning",
              "Python",
              "React",
              "Node.js",
              "Accessibility Design",
              "Project Management",
              "UI/UX Design"
            ]}
            bigPicture="The system has potential to significantly reduce scheduling stress for thousands of ISU students while ensuring they stay on track for graduation. It demonstrates how AI can be used to solve real-world problems while maintaining accessibility and user-centered design principles."
            resources={[
              "TensorFlow",
              "University API",
              "AWS Services",
              "ACM Digital Library",
              "IEEE Xplore"
            ]}
            reducedTilt={true}
          />
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-16 bg-gray-50/50 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <SectionHeader icon={Code} title="Featured Projects" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="Smart Calendar System"
              description="Created a Raspberry Pi-based smart calendar displaying schedules, weather updates, and ISU events on an LCD screen with a custom 3D-printed case."
              role="Solo Developer & Designer"
              skills={["Python", "Hardware Integration", "3D Printing", "IoT", "UI Design"]}
              resources={["Raspberry Pi", "Python Libraries", "3D Printing Lab"]}
            />
            <ProjectCard
              title="Security Access Control"
              description="Developed security access control features for John Deere's global platform, focusing on employee permission handling and audit compliance."
              role="Security Developer"
              skills={["Security Protocols", "Global Development", "API Design"]}
              resources={["Internal APIs", "Security Documentation"]}
            />
            <ProjectCard
              title="Sustainability in Engineering"
              description="Collaborated with industrial engineering students to optimize energy consumption in manufacturing processes."
              role="Technical Lead"
              skills={["Energy Analysis", "Cross-disciplinary Collaboration", "Sustainable Design"]}
              resources={["Energy Monitoring Tools", "Simulation Software"]}
            />
          </div>
        </div>
      </section>

      {/* Academic Reflections */}
      <section id="reflections" className="py-16 bg-white/50 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <SectionHeader icon={Book} title="Academic Reflections" />
          <div className="space-y-6">
            <ExpandableSection 
              title="General Education Reflection" 
              icon={<GraduationCap className="w-6 h-6 text-blue-600" />}
            >
              <div className="space-y-4 text-gray-700">
                <p>My general education courses have been instrumental in developing a well-rounded perspective on engineering problems. Through these courses, I've learned to evaluate and formulate engineering solutions that consider not just technical aspects, but also economic, global, and societal contexts.</p>
                
                <h4 className="font-semibold mt-4">Impact on Problem Solving</h4>
                <p>My economics courses helped me understand the financial implications of engineering decisions, while my sociology courses taught me to consider the broader social impact of technological solutions. These perspectives have become invaluable when approaching engineering challenges.</p>
                
                <h4 className="font-semibold mt-4">Beyond Technical Solutions</h4>
                <p>Through my economics coursework, I learned to evaluate the cost-benefit analysis of different engineering approaches, which proved particularly valuable during my internship at John Deere when working on security access control systems.</p>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title="Cumulative Reflection" 
              icon={<FileText className="w-6 h-6 text-blue-600" />}
            >
              <div className="space-y-4 text-gray-700">
                <p>Looking back at my time in Iowa State's Computer Engineering program, I can honestly say it's been quite a journey. Between the late nights coding, countless cups of coffee at Parks Library, and amazing friendships formed during group projects, I've grown significantly both as an engineer and as a person.</p>

                <h4 className="font-semibold mt-4">Freshman Year Highlight</h4>
                <p>One of my favorite experiences came during my freshman year in CPRE 186. I created this smart calendar project that combined Python programming with hardware integration on a Raspberry Pi.</p>

                <h4 className="font-semibold mt-4">Senior Design Experience</h4>
                <p>Senior design (CPRE 491/492) was definitely the highlight of my academic experience. My team and I created an AI-powered schedule planner for Iowa State students. We wanted to solve a real problem we all faced - the stress of planning future semesters.</p>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title="Ethics Essay" 
              icon={<FileSpreadsheet className="w-6 h-6 text-blue-600" />}
            >
              <div className="space-y-4 text-gray-700">
                <p>A "Code of Ethics" though heavily saturated in today's workforce is vital to the success and general well being of everyone involved with any sort of work. This ethical code provides a framework of principles and guidelines that act as a moral compass.</p>

                <h4 className="font-semibold mt-4">Personal Approach to Ethics</h4>
                <p>When an ethically questionable situation arises I try my best to adhere to both the established code of ethics and my intuition. It is important to consider the impact of my decisions on everyone involved.</p>

                <h4 className="font-semibold mt-4">Key Virtues</h4>
                <p>Three virtues stand out as particularly relevant: integrity, responsibility, and honesty. These virtues align with the principles upheld in the case study, emphasizing the importance of maintaining one's integrity.</p>
              </div>
            </ExpandableSection>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section className="py-16 bg-white/50 backdrop-blur-lg">
  <div className="container mx-auto px-6">
    <SectionHeader icon={FileText} title="Resume" />
    <Card hover>
      <CardContent>
        <ResumeViewer />
      </CardContent>
    </Card>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#projects" className="block hover:text-blue-400 transition-colors">Projects</a>
                <a href="#experience" className="block hover:text-blue-400 transition-colors">Experience</a>
                <a href="#education" className="block hover:text-blue-400 transition-colors">Education</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2">
                <a 
                  href="mailto:kobymfowler@outlook.com" 
                  className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
                <a 
                  href="https://github.com/KobyFowler" 
                  className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://linkedin.com/in/koby-fowler" 
                  className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <p className="text-gray-400">Portfolio created as part of CprE 494 at Iowa State University.</p>
              <p className="text-gray-400 mt-2">© 2024 Koby Fowler. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
};

export default App;
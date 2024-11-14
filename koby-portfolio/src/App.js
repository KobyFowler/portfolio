import React, { useState, useEffect, useRef } from 'react';
import { 
  CircuitBoard, Code, Cpu, Terminal, Layers, 
  Workflow, Binary, Database, Mail, Github, 
  Linkedin, ExternalLink, ChevronUp, ChevronDown,
  Sparkles, Fingerprint, Braces, Rocket,
  Globe, Books, Award, Building2, 
  ArrowRight, Download, Maximize2, Minimize2,
  FileText,
  ScrollText,
  BookOpen,
  PenTool
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

// OpenMCT Contribution Section Component
const OpenMCTSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-blue-800 hover:border-blue-500 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Rocket className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">NASA OpenMCT Contribution</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Contributing to NASA's Open Source Mission Control Framework
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            {['Open Source', 'NASA', 'JavaScript', 'Vue.js', 'Mission Control'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-blue-400" />
          ) : (
            <ChevronDown className="w-6 h-6 text-blue-400" />
          )}
        </button>
      </div>
      
      <div
        className={`transition-all duration-500 overflow-hidden
          ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="pt-6 space-y-4 text-gray-300">
          <p>
            Actively contributing to NASA's OpenMCT (Open Mission Control Technologies), 
            an open-source mission control framework for visualization of data on 
            desktop and mobile devices.
          </p>
          
          <div className="space-y-2">
            <h4 className="text-xl font-semibold text-white">Contributions Include:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Implementing new visualization components for telemetry data</li>
              <li>Enhancing real-time data handling capabilities</li>
              <li>Improving mobile responsiveness of control interfaces</li>
              <li>Collaborating with NASA engineers on feature implementations</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-xl font-semibold text-white">Impact:</h4>
            <p>
              Contributing to OpenMCT helps advance space exploration by improving the tools
              used to monitor and control space missions. This work directly impacts how
              mission control operators visualize and interact with spacecraft data.
            </p>
          </div>
          
          <div className="flex gap-4 pt-4">
            <a
              href="https://github.com/nasa/openmct"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 
                       hover:bg-blue-500/30 rounded-lg transition-colors"
            >
              <Globe className="w-5 h-5" />
              View Project
            </a>
            <a
              href="https://github.com/nasa/openmct/pulls?q=author%3AKobyFowler"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 
                       hover:bg-blue-500/30 rounded-lg transition-colors"
            >
              <FileText className="w-5 h-5" />
              View Contributions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Expandable Essay Component
const EssayCard = ({ title, subtitle, content, date }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 
                  hover:border-blue-500 transition-all duration-300">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6 focus:outline-none"
      >
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400">
              {title}
            </h3>
            <p className="text-gray-400">{subtitle}</p>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
          <div className={`transform transition-transform duration-300 
                        ${isExpanded ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </button>
      
      <div
        ref={contentRef}
        className={`transition-all duration-500 overflow-hidden
          ${isExpanded ? 'opacity-100' : 'opacity-0 max-h-0'}`}
        style={{
          maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : '0'
        }}
      >
        <div className="p-6 border-t border-gray-700">
          <div className="prose prose-invert max-h-[500px] overflow-y-auto 
                       scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-600">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

// Essays Section
const EssaysSection = () => {
  const essays = [
    {
      title: "Ethics in Software Engineering",
      subtitle: "",
      date: "",
      content: `
      A “Code of Ethics” though heavily saturated in today's workforce is vital to the success and general well being of everyone involved with any sort of work needing to be done. This ethical code provides a framework of principles and guidelines that act as a moral compass for any dispute or situation that may arise. The outlining of these values and responsibilities will create an environment to nurture trust, integrity, and accountability. When an ethically questionable situation arises I try my best to adhere to both the established code of ethics, whether this is IEEE Code of Ethics or a particular code layed out by a company, but also my intuition. It is important to consider the impact of my decisions on everyone involved, this could be partners, employees, a company, or the greater community. It is necessary to strive for a solution that aligns with the main ethical principles, prioritizing transparency, honesty, and fairness. Throughout the course of CprE 394 we discussed many ethical issues from large to small. These included but aren't limited to the Big Data Issue, Amazon Echo Issue, and the Volkswagen Issue. These large scale issues differed heavily from my personal experiences and left lessons of a diverse set of ethical decision-making. Not only did the issues themselves provide insight but I was also able to discuss with classmates and receive their perspectives and gather information from them as well. This course provided many opportunities to encounter ethical issues and their solutions. Many solutions I did agree with, some I did not. I found that a lot of the time big companies prioritize their own well being and wallets while the opinions I received from other students and also Code of Ethics prioritize customer satisfaction and well being. The class decided that the personal opinion was a much more important one than that of the big company. In reflecting on the "Virtue of Ethics" within the context of a case study, three virtues stand out as particularly relevant: integrity, responsibility, and honesty. These virtues align with the principles upheld in the case study, emphasizing the importance of maintaining one's integrity, taking responsibility for actions, and being honest in all dealings.
I chose these virtues based on their direct applicability to the case study, as they address core ethical concerns within the scenario. Other virtues may be less relevant because they might not directly address the specific ethical challenges presented in the case study. While the Virtue of Ethics provides a comprehensive framework, the selected virtues capture the essence of the ethical considerations in the given context. In conclusion, adherence to a Code of Ethics and consideration of the Virtue of Ethics are crucial for navigating ethical dilemmas. By incorporating these principles into decision-making processes, individuals can contribute to a culture of integrity, responsibility, and honesty within their professional and academic pursuits.

      `
    },
    {
      title: "General Education Reflection",
      subtitle: "",
      date: "",
      content: `
       My general education courses have been instrumental in developing a well-rounded perspective on engineering problems. Through these courses, I've learned to evaluate and formulate engineering solutions that consider not just technical aspects, but also economic, global, and societal contexts.

Impact on Problem Solving
My economics courses helped me understand the financial implications of engineering decisions, while my sociology courses taught me to consider the broader social impact of technological solutions. These perspectives have become invaluable when approaching engineering challenges, as they've taught me to consider not just the technical feasibility but also the societal implications and economic viability of potential solutions.

Beyond Technical Solutions
For example, through my economics coursework, I learned to evaluate the cost-benefit analysis of different engineering approaches, which proved particularly valuable during my internship at John Deere when working on security access control systems. My sociology classes helped me understand the importance of considering diverse user needs and accessibility requirements in our senior design project, ensuring our AI scheduling system would be useful for all students, not just those with technical backgrounds.
      `
    },
    {
      title: "Cumulative Reflection",
      subtitle: "",
      date: "",
      content: `
       Looking back at my time in Iowa State's Computer Engineering program, I can honestly say it's been quite a ride. Between the late nights coding, countless cups of coffee at Parks Library, and amazing friendships formed during group projects, I've grown so much both as an engineer and as a person. The program threw everything at us - from intense coursework to hands-on projects - and somehow, I made it through with skills I never thought I'd have. Especially since my time at Iowa State was my first time back in person for school due to Covid-19, I could not ask for a better experience.

One of my favorite experiences actually came during my freshman year in CPRE 186. I created this smart calendar project that combined Python programming with hardware integration on a Raspberry Pi. I remember being so excited to design and 3D print a custom case for it in the Computation Lab - it took a few tries to get the measurements just right! The project basically displayed my schedule, weather updates, and ISU events on an LCD screen. What made this project special wasn't just that it worked (though that was pretty exciting for freshman me), but how it showed me what's possible when you combine software and hardware. I enjoyed the class so much that I became a TA for it in later semesters. Helping other freshmen debug their first hardware projects and seeing their faces light up when everything finally worked brought back memories of my own excitement. Being a TA taught me how to explain technical concepts clearly and showed me that sometimes teaching others is the best way to master something yourself.

Senior design (CPRE 491/492) was definitely the highlight of my academic experience. My team and I created an AI-powered schedule planner for Iowa State students. We wanted to solve a real problem we all faced - the stress of planning future semesters. Our system uses AI to analyze course patterns, prerequisites, and even preferred class times to suggest optimized schedules. We had to learn so much beyond our regular coursework, from machine learning algorithms to user experience design. We consulted extensively with the ACM Digital Library and IEEE Xplore to research similar systems and best practices in AI education tools. The development process involved working closely with the university's accessibility office to ensure our system was inclusive for all students. The best part was getting feedback from other students who tested our system and seeing how it could actually make their lives easier.

Getting involved in the Computer Engineering Club and IEEE was one of the best decisions I made. Being the technical lead for our hackathon team taught me that being a good engineer isn't just about writing perfect code - it's about working with people and understanding what they need. This really clicked during my internship at John Deere. I went from being nervous about presenting to confidently explaining technical concepts to senior engineers, managers, and eventually even my own engineers below me. Trust me, nothing teaches you communication skills quite like trying to explain a complex bug to both the development team and business folks in the same meeting!

During my time at John Deere, I worked on their security access control team, where I saw firsthand how engineering decisions impact both economic and environmental factors. We developed software for optimal security control, which not only helped reduce management time and make employee permission handling easier but saved the company money during auditing periods for such access controls. This experience taught me to consider both sustainability and economic viability in engineering solutions. I also got involved with their international team, collaborating with developers in India and Germany on a global software platform, which helped me understand the importance of designing solutions that work across different cultural and technological contexts.

The tech world moves incredibly fast, and Iowa State taught me that you never really stop learning. I've gotten into the habit of learning new things on my own through Coursera and GitHub. Right now, I'm teaching myself React Native because mobile development interests me, and I've been playing around with TensorFlow since our senior design project got me interested in AI applications. I've also earned AWS cloud practitioner certification and completed Google's Machine Learning crash course to stay up to date with the current industry.

If I could do it all over again, I'd probably get involved in research earlier. I didn't realize until later how cool some of the projects were that professors were working on. I'd also try to work with students from other majors more - some of the best ideas come from combining different perspectives. The interdisciplinary potential became clear when I participated in the Sustainability in Engineering Workshop, where I worked with industrial engineering students on optimizing energy consumption in manufacturing processes.

Looking back on these past four years at Iowa State, it's crazy to think how much has changed. When I first walked into Coover Hall as a freshman, I thought engineering was just about writing code and solving technical problems. Man, was I wrong! While I definitely learned to code (and debug... lots of debugging), the real lessons came from late-night project sessions with teammates, explaining complex ideas to non-technical folks at John Deere, and realizing how our work as engineers can actually make a difference in people's lives. From making sure our AI scheduler could work for every student on campus to seeing how our solutions could connect with people around the world - it's opened my eyes to what engineering is really about. I'm not going to pretend I know everything now, but I'm definitely not the same nervous freshman who first walked into CPRE 186. Whatever comes next in my career, I know I've got a solid foundation to build on.


      `
    }
  ];

  return (
    <section className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <BookOpen className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-4xl font-bold">Technical Essays</h2>
        </div>
        
        <div className="space-y-6">
          {essays.map((essay, index) => (
            <EssayCard key={index} {...essay} />
          ))}
        </div>
      </div>
    </section>
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

          {/* OpenMCT Section */}
<section className="py-20 bg-gray-900/50">
  <div className="container mx-auto px-6">
    <OpenMCTSection />
  </div>
</section>

{/* Essays Section */}
<EssaysSection />

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
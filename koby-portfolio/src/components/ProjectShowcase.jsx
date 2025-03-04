import React, { useState, useRef, useMemo } from 'react';
import { 
  Rocket, Code, Github, ExternalLink, 
  ChevronLeft, ChevronRight, Shield, Database, Server
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const PROJECTS = [
  {
    id: 1,
    title: "Security Access Control System",
    description: "Enterprise-level access management application for secure authentication and authorization.",
    fullDescription: "Led the development of a comprehensive security access control system at John Deere, enabling streamlined management of user permissions across the enterprise. The application features role-based access control, detailed audit logging, and integration with existing identity providers.",
    image: `${process.env.PUBLIC_URL}/BigDeere.png`,
    technologies: ["TypeScript", "React", "MySQL", "Node.js", "Express.js"],
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    links: [
      { text: "Case Study", url: "#" }
    ]
  },
  {
    id: 2,
    title: "Pharmaceutical Trial Management Tool",
    description: "Mission-critical application for managing pharmaceutical trial data and workflows.",
    fullDescription: "Developed and maintained critical components for a pharmaceutical trial management system at Korio, Inc. The application supports complex data workflows, ensuring data integrity and compliance with industry regulations. Implemented robust data change scripts and automated database tools to streamline operations.",
    image: `${process.env.PUBLIC_URL}/BigKorio.png`,
    technologies: ["JavaScript", "TypeScript", "MongoDB", "Node.js"],
    icon: <Database className="w-6 h-6 text-blue-400" />,
    links: [
      { text: "Overview", url: "#" }
    ]
  },
  {
    id: 3,
    title: "Autonomous Robot Control System",
    description: "Custom drive train control software for autonomous robotic inspection systems.",
    fullDescription: "During my apprenticeship at InspectoBot, I collaborated with senior engineers to develop precision movement algorithms for autonomous robotic systems. The software enables reliable navigation and mobility for robots used in industrial inspection applications.",
    image: `${process.env.PUBLIC_URL}/BigBot.jpeg`,
    technologies: ["Robotics", "C", "Python", "Autonomous Systems"],
    icon: <Code className="w-6 h-6 text-blue-400" />,
    links: [
      { text: "Project Details", url: "#" }
    ]
  }
];

const ProjectCard = React.memo(({ project, onClick }) => (
  <Card 
    className="h-full group hover:border-blue-500 transition-all duration-300 cursor-pointer"
    onClick={() => onClick(project)}
  >
    <div className="overflow-hidden rounded-t-lg h-48">
      <img 
        src={project.image} 
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/20 rounded-lg group-hover:scale-110 transition-transform">
          {project.icon}
        </div>
        <CardTitle className="group-hover:text-blue-400 transition-colors">
          {project.title}
        </CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-gray-400 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full
                     hover:scale-110 transition-transform text-xs"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 3 && (
          <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
            +{project.technologies.length - 3}
          </span>
        )}
      </div>
    </CardContent>
  </Card>
));

const ProjectDetailsModal = React.memo(({ project, isVisible, onClose }) => {
  if (!project) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4
                     bg-gray-900/95 backdrop-blur-sm transition-opacity duration-300
                     ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-gray-800 rounded-xl overflow-hidden w-full max-w-4xl
                       transition-transform duration-300
                       ${isVisible ? 'scale-100' : 'scale-95'}`}>
        <div className="relative h-64">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-gray-900/50 backdrop-blur-sm
                       rounded-full flex items-center justify-center
                       hover:bg-blue-500/50 transition-colors"
            aria-label="Close details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              {project.icon}
            </div>
            <h3 className="text-2xl font-bold">{project.title}</h3>
          </div>
          
          <p className="text-gray-300 mb-6">{project.fullDescription}</p>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg
                         hover:bg-blue-600 transition-colors group"
              >
                {link.text.toLowerCase().includes('github') ? (
                  <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                ) : (
                  <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                )}
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

const ProjectShowcase = React.memo(() => {
  const [activeProject, setActiveProject] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const sliderRef = useRef(null);
  
  const openProjectDetails = (project) => {
    setActiveProject(project);
    setDetailsVisible(true);
  };
  
  const closeProjectDetails = () => {
    setDetailsVisible(false);
    setTimeout(() => setActiveProject(null), 300);
  };
  
  // Scroll slider left/right
  const scroll = (direction) => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6 relative">
        <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Rocket className="w-8 h-8 text-blue-400" />
          </div>
          Featured Projects
        </h2>
        
        <div className="relative">
          {/* Project slider with horizontal scroll */}
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto pb-8 scrollbar-thin gap-6 snap-x snap-mandatory"
          >
            {PROJECTS.map((project) => (
              <div 
                key={project.id} 
                className="min-w-[300px] md:min-w-[400px] snap-start"
              >
                <ProjectCard 
                  project={project} 
                  onClick={openProjectDetails} 
                />
              </div>
            ))}
          </div>
          
          {/* Slider navigation buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4
                     w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center
                     hover:bg-blue-500/30 transition-colors duration-300 z-10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4
                     w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center
                     hover:bg-blue-500/30 transition-colors duration-300 z-10"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Project details modal */}
        <ProjectDetailsModal 
          project={activeProject}
          isVisible={detailsVisible}
          onClose={closeProjectDetails}
        />
      </div>
    </section>
  );
});

export default ProjectShowcase;
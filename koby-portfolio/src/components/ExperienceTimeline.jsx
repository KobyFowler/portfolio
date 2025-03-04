import React, { useState } from 'react';
import { Building2, ChevronDown, ChevronUp } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Korio, Inc.",
    logo: `${process.env.PUBLIC_URL}/korio.jpg`,
    location: "Remote",
    period: "October 2024 - Present",
    description: "Developed and maintained mission-critical application functions using JavaScript and TypeScript, supporting pharmaceutical trial management and data analysis workflows.",
    responsibilities: [
      "Designed and implemented robust data change scripts for production-level MongoDB database management, ensuring seamless daily operations and data integrity.",
      "Provided real-time production support through development of automated database interaction tools, significantly reducing manual intervention time and potential for errors.",
      "Architected full-stack JavaScript/TypeScript solutions that enhanced application reliability and maintainability across the development lifecycle.",
      "Collaborated with cross-functional teams to identify, troubleshoot, and resolve production database issues through strategic script development."
    ],
    technologies: ["JavaScript", "TypeScript", "MongoDB", "Node.js"]
  },
  {
    id: 2,
    role: "Full Stack Engineer",
    company: "John Deere",
    logo: `${process.env.PUBLIC_URL}/deere.png`,
    location: "Johnston, Iowa",
    period: "May 2023 - October 2024",
    description: "Led a cross-functional engineering team in developing and launching a Security Access Control application, overseeing architecture decisions and implementation strategies while mentoring team members.",
    responsibilities: [
      "Architected and implemented a full-stack TypeScript/JavaScript security application, incorporating robust user authentication and authorization systems crucial for enterprise-wide access management.",
      "Designed and optimized MySQL database schemas and queries, ensuring efficient data retrieval and maintaining security standards for access control information.",
      "Developed responsive and intuitive frontend interfaces using modern JavaScript frameworks, resulting in improved user experience and streamlined access management workflows.",
      "Spearheaded the implementation of security best practices and protocols, establishing standardized access control patterns across the enterprise platform.",
      "Successfully managed the complete software development lifecycle, from initial requirements gathering through deployment and maintenance, while meeting critical security compliance standards."
    ],
    technologies: ["TypeScript", "JavaScript", "React", "MySQL", "Node.js"]
  },
  {
    id: 3,
    role: "Teachers Assistant",
    company: "Iowa State University",
    logo: `${process.env.PUBLIC_URL}/IowaState.png`,
    location: "Ames, Iowa",
    period: "August 2023 - December 2024",
    description: "Provided hands-on instruction and mentorship to over 50 students per semester in Introduction to C Programming (CPRE 185), fostering fundamental programming concepts and debugging skills.",
    responsibilities: [
      "Facilitated project-based learning in Freshman Design (CPRE 186), guiding multiple student teams through complex engineering challenges from conception to completion.",
      "Developed and delivered targeted instructional support for diverse learning styles, resulting in improved student comprehension of core programming concepts and problem-solving methodologies.",
      "Conducted interactive laboratory sessions focused on practical C programming applications, providing real-time debugging assistance and code review feedback.",
      "Mentored multiple student project teams simultaneously, identifying unique technical challenges and implementing tailored solutions to ensure project success.",
      "Created and graded assignments and laboratory exercises, providing detailed feedback to enhance student understanding of programming fundamentals and design principles."
    ],
    technologies: ["C Programming", "Mentoring", "Technical Documentation"]
  },
  {
    id: 4,
    role: "IT Solutions",
    company: "Iowa State University",
    logo: `${process.env.PUBLIC_URL}/IowaState.png`,
    location: "Ames, Iowa",
    period: "December 2021 - December 2022",
    description: "Provided enterprise-level IT support for a diverse user base of over 30,000 students and faculty, resolving complex hardware, software, and network connectivity issues.",
    responsibilities: [
      "Managed identity and access management solutions through Okta, ensuring secure authentication and authorization for university-wide systems and resources.",
      "Troubleshot and resolved critical network operations issues in real-time, maintaining high availability of essential university services and resources.",
      "Implemented security best practices and protocols across university systems, protecting sensitive academic and personal data while ensuring compliance with institutional policies.",
      "Collaborated with IT teams across multiple departments to diagnose and resolve complex technical issues, ensuring minimal disruption to academic operations.",
      "Developed and maintained documentation for common technical issues and solutions, streamlining the support process and reducing resolution times."
    ],
    technologies: ["Okta", "IT Support", "Network Operations", "Security Protocols"]
  },
  {
    id: 5,
    role: "Software Developer - Apprentice",
    company: "InspectoBot",
    logo: `${process.env.PUBLIC_URL}/Bot.png`,
    location: "Des Moines, Iowa",
    period: "May 2022 - August 2022",
    description: "Developed custom drive train control software for autonomous robotic systems, collaborating directly with senior software engineers to implement precision movement algorithms.",
    responsibilities: [
      "Implemented and tested drive train software modifications under mentorship, ensuring reliable robot mobility and performance.",
      "Gained hands-on experience in robotics software development while working within an expert-led engineering team focused on autonomous inspection systems."
    ],
    technologies: ["Robotics", "Software Development", "Autonomous Systems"]
  }
];

const TimelineItem = ({ experience, isLast }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gray-700" />
      )}
      
      <div className="flex gap-6">
        {/* Company logo */}
        <div className="relative z-10 w-12 h-12 bg-gray-800 rounded-full border-4 border-gray-900 overflow-hidden flex-shrink-0">
          <img 
            src={experience.logo} 
            alt={experience.company} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className={`flex-1 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700
                      ${expanded ? 'border-blue-500/40' : 'hover:border-blue-500/20'}
                      transition-all duration-300 p-6`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
            <div>
              <h3 className="text-xl font-bold text-blue-400">{experience.role}</h3>
              <div className="flex items-center gap-2 text-gray-300">
                <span>{experience.company}</span>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                <span className="text-gray-400 text-sm">{experience.location}</span>
              </div>
            </div>
            <div className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm">
              {experience.period}
            </div>
          </div>
          
          <p className="text-gray-300 mb-4">{experience.description}</p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs
                         hover:bg-blue-500/20 hover:text-blue-300 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Expand/collapse button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            {expanded ? (
              <>
                <span>Show less</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Read more</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
          
          {/* Expanded content */}
          <div className={`mt-4 text-gray-300 space-y-2 overflow-hidden transition-all duration-300
                         ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <h4 className="font-semibold">Key Responsibilities:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {experience.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceTimeline = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6 relative">
        <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Building2 className="w-8 h-8 text-blue-400" />
          </div>
          Professional Journey
        </h2>
        
        <div className="space-y-10 max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              experience={experience}
              isLast={index === experiences.length - 1}
            />
          ))}
          
          {/* Job search indicator */}
          <div className="flex items-center gap-4 pt-8">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-blue-400" />
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <p className="text-blue-300">
                I'm currently open to new opportunities! If you think I'd be a good fit for your team, let's connect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
import React, { useState } from 'react';
import { 
  Download, FileText, ExternalLink, 
  Briefcase, Eye, Mail, Phone, 
  Calendar, MapPin, Award, Book, Code
} from 'lucide-react';

const FallbackResumeViewer = () => {
  const [section, setSection] = useState('summary');
  
  // PDF URLs - try both GitHub Pages path and direct link
  const resumeLinks = {
    gitHubPages: `${process.env.PUBLIC_URL}/resume.pdf`,
    directLink: 'https://kobyfowler.github.io/resume.pdf', // Adjust if needed
    rawGitHub: 'https://raw.githubusercontent.com/kobyfowler/kobyfowler.github.io/main/public/resume.pdf' // Adjust path as needed
  };
  
  // Resume data for fallback display
  const resumeData = {
    name: "Koby Fowler",
    title: "Software Engineer",
    contact: {
      email: "kobymfowler@outlook.com",
      phone: "815-793-0818",
      location: "Iowa",
      github: "github.com/kobyfowler",
      linkedin: "linkedin.com/in/koby-fowler"
    },
    summary: "Software Engineer with experience developing full-stack applications using JavaScript, TypeScript, React, and Node.js. Skilled in security access control systems, database management, and mission-critical application maintenance.",
    experience: [
      {
        role: "Software Engineer",
        company: "Korio, Inc.",
        period: "October 2024 - Present",
        description: "Developed and maintained mission-critical application functions using JavaScript and TypeScript, supporting pharmaceutical trial management and data analysis workflows.",
        achievements: [
          "Designed robust data change scripts for production-level MongoDB database management",
          "Provided real-time production support through development of automated database tools",
          "Architected full-stack JavaScript/TypeScript solutions enhancing application reliability"
        ]
      },
      {
        role: "Full Stack Engineer",
        company: "John Deere",
        period: "May 2023 - October 2024",
        description: "Led a cross-functional engineering team in developing and launching a Security Access Control application.",
        achievements: [
          "Architected and implemented a full-stack TypeScript/JavaScript security application",
          "Designed and optimized MySQL database schemas and queries for security applications",
          "Developed responsive interfaces using modern JavaScript frameworks"
        ]
      }
    ],
    skills: [
      "JavaScript", "TypeScript", "React", "Node.js", "MongoDB", 
      "MySQL", "Express.js", "Full Stack Development", "Security Systems"
    ],
    education: {
      degree: "Bachelor of Science in Computer Engineering",
      school: "Iowa State University",
      year: "2023"
    }
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-700 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{resumeData.name}</h2>
          <p className="text-xl text-blue-400 mb-4">{resumeData.title}</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>{resumeData.contact.email}</span>
            </div>
            {resumeData.contact.phone && (
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{resumeData.contact.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>{resumeData.contact.location}</span>
            </div>
          </div>
          
          <p className="text-gray-300">{resumeData.summary}</p>
        </div>
        
        {/* Tab navigation */}
        <div className="flex flex-wrap border-b border-gray-700 mb-6 gap-2">
          <button 
            onClick={() => setSection('summary')}
            className={`px-4 py-2 rounded-t-lg ${section === 'summary' 
              ? 'bg-blue-500/20 text-blue-400 border-b-2 border-blue-500' 
              : 'text-gray-400 hover:text-gray-300'}`}
          >
            Summary
          </button>
          <button 
            onClick={() => setSection('experience')}
            className={`px-4 py-2 rounded-t-lg ${section === 'experience' 
              ? 'bg-blue-500/20 text-blue-400 border-b-2 border-blue-500' 
              : 'text-gray-400 hover:text-gray-300'}`}
          >
            Experience
          </button>
          <button 
            onClick={() => setSection('skills')}
            className={`px-4 py-2 rounded-t-lg ${section === 'skills' 
              ? 'bg-blue-500/20 text-blue-400 border-b-2 border-blue-500' 
              : 'text-gray-400 hover:text-gray-300'}`}
          >
            Skills
          </button>
          <button 
            onClick={() => setSection('education')}
            className={`px-4 py-2 rounded-t-lg ${section === 'education' 
              ? 'bg-blue-500/20 text-blue-400 border-b-2 border-blue-500' 
              : 'text-gray-400 hover:text-gray-300'}`}
          >
            Education
          </button>
        </div>
        
        {/* Tab content */}
        <div className="mb-8">
          {section === 'summary' && (
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-400" />
                Professional Summary
              </h3>
              <p className="text-gray-300 mb-4">{resumeData.summary}</p>
              <p className="text-gray-400 text-sm italic">
                This is a simplified version of my resume. For more detailed information, please download the full PDF version below.
              </p>
            </div>
          )}
          
          {section === 'experience' && (
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-400" />
                Work Experience
              </h3>
              <div className="space-y-6">
                {resumeData.experience.map((job, index) => (
                  <div key={index} className="border-l-2 border-blue-500/30 pl-4">
                    <h4 className="text-lg font-bold">{job.role}</h4>
                    <div className="flex flex-wrap justify-between text-sm mb-2">
                      <span className="text-blue-400">{job.company}</span>
                      <span className="text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {job.period}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">{job.description}</p>
                    <ul className="list-disc pl-5 text-gray-400 text-sm">
                      {job.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {section === 'skills' && (
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {resumeData.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full
                             hover:bg-blue-500/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {section === 'education' && (
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Book className="w-5 h-5 text-blue-400" />
                Education
              </h3>
              <div className="border-l-2 border-blue-500/30 pl-4">
                <h4 className="text-lg font-bold">{resumeData.education.degree}</h4>
                <div className="flex flex-wrap justify-between text-sm">
                  <span className="text-blue-400">{resumeData.education.school}</span>
                  <span className="text-gray-400">{resumeData.education.year}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 mb-6">
            This is a simplified version of my resume. For the complete details, please download the PDF.
          </p>
        </div>
      </div>

      {/* Download Options with multiple fallback links */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {Object.values(resumeLinks).map((link, index) => (
          <a
            key={index}
            href={link}
            download="Koby_Fowler_Resume.pdf"
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white 
                     rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 
                     hover:scale-105 gap-2"
          >
            <Download className="w-5 h-5" />
            Download Resume {index > 0 ? `(Option ${index + 1})` : ''}
          </a>
        ))}
      </div>
      
      <div className="text-center text-sm text-gray-500">
        If you're having trouble with the download links, please contact me directly at {resumeData.contact.email}.
      </div>
    </div>
  );
};

export default FallbackResumeViewer;
import React from 'react';
import { Cpu, Users, Book, Shield, Database, Code, Server, Terminal } from 'lucide-react';

const SkillProgressBar = ({ skill, level }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium">{skill}</span>
        <span className="text-sm text-blue-400">{level}%</span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000 ease-out"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
};

const SkillCategory = ({ title, skills, icon }) => {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const technicalSkills = {
    languages: {
      title: "Programming Languages",
      icon: <Code className="w-5 h-5 text-blue-400" />,
      skills: ["JavaScript", "TypeScript", "C", "Python"]
    },
    frontend: {
      title: "Frontend Technologies",
      icon: <Terminal className="w-5 h-5 text-blue-400" />,
      skills: ["React", "HTML", "CSS"]
    },
    backend: {
      title: "Backend Technologies",
      icon: <Server className="w-5 h-5 text-blue-400" />,
      skills: ["Node.js", "Express.js"]
    },
    databases: {
      title: "Databases",
      icon: <Database className="w-5 h-5 text-blue-400" />,
      skills: ["MongoDB", "MySQL"]
    },
    devops: {
      title: "DevOps & Tools",
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      skills: ["Git", "CI/CD Pipelines", "Linux", "Windows"]
    },
    security: {
      title: "Security",
      icon: <Shield className="w-5 h-5 text-blue-400" />,
      skills: ["Access Control Systems", "Okta", "Authentication/Authorization"]
    }
  };

  const professionalSkills = [
    { skill: "Technical Leadership", level: 90 },
    { skill: "Team Collaboration", level: 95 },
    { skill: "Problem-Solving", level: 92 },
    { skill: "Project Management", level: 85 },
    { skill: "Technical Documentation", level: 88 },
    { skill: "Agile Development", level: 82 },
    { skill: "Production Support", level: 90 },
    { skill: "Mentoring/Teaching", level: 88 }
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6 relative">
        <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Cpu className="w-8 h-8 text-blue-400" />
          </div>
          Technical Skills
        </h2>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8">Professional Skills</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {professionalSkills.map((skill, index) => (
              <SkillProgressBar
                key={index}
                skill={skill.skill}
                level={skill.level}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-8">Technical Expertise</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(technicalSkills).map((category, index) => (
              <SkillCategory
                key={index}
                title={category.title}
                skills={category.skills}
                icon={category.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
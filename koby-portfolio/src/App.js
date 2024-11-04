import React, { useState } from 'react';
import { 
  Mail, 
  Lightbulb, 
  Code, 
  Briefcase, 
  Github, 
  Linkedin, 
  GraduationCap, 
  FileText, 
  Book, 
  Award,
  ChevronUp,
  ChevronDown 
} from 'lucide-react';

// Component definitions remain the same until the ExpandableSection...

const ExpandableSection = ({ title, children, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg bg-white shadow-md">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="text-2xl font-semibold">{title}</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6 text-gray-500" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};

// Custom Card Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 border-b border-gray-200">
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);


const ProjectCard = ({ title, description, role, skills, bigPicture = '', resources = [] }) => (
  <Card className="h-full">
    <CardHeader>
      <h3 className="text-xl font-semibold">{title}</h3>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <h4 className="font-semibold text-gray-800">Description</h4>
        <p className="text-gray-600">{description}</p>
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">Role</h4>
        <p className="text-gray-600">{role}</p>
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">Skills Gained</h4>
        <ul className="list-disc list-inside text-gray-600">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      {bigPicture && (
        <div>
          <h4 className="font-semibold text-gray-800">Big Picture Contribution</h4>
          <p className="text-gray-600">{bigPicture}</p>
        </div>
      )}
      {resources.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800">Resources Used</h4>
          <ul className="list-disc list-inside text-gray-600">
            {resources.map((resource, index) => (
              <li key={index}>{resource}</li>
            ))}
          </ul>
        </div>
      )}
    </CardContent>
  </Card>
);

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold mb-6">Koby Fowler</h1>
            <p className="text-xl mb-8">Computer Engineering Graduate</p>
            <div className="flex items-center space-x-6">
              <a href="mailto:kobymfowler@outlook.com" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
                <Mail className="w-5 h-5" />
                <span>kobymfowler@outlook.com</span>
              </a>
              <div className="flex space-x-4">
                <a href="https://github.com/KobyFowler" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="www.linkedin.com/in/koby-fowler" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Career Objective */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-2 mb-8">
            <Lightbulb className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold">Career Objective</h2>
          </div>
          <Card>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                As a recent Computer Engineering graduate from Iowa State University, I am passionate about combining software and hardware solutions to create innovative systems. Through my experiences in AI development, embedded systems, and security infrastructure, I aim to contribute to projects that push technological boundaries while maintaining a strong focus on accessibility and user experience. My goal is to work in a collaborative environment where I can continue learning and growing while making meaningful contributions to the field of computer engineering.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Senior Design Project */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-2 mb-8">
            <Award className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold">Senior Design Project</h2>
          </div>
          <ProjectCard 
            title="AI-Powered Schedule Planner"
            description="Developed an AI-powered schedule planning system for Iowa State students that analyzes course patterns, prerequisites, and preferred class times to suggest optimized schedules. The system incorporates accessibility features and user experience considerations to ensure inclusivity for all students."
            role="Team Lead and AI Implementation Specialist"
            skills={[
              "Machine Learning Algorithm Implementation",
              "User Experience Design",
              "Accessibility Integration",
              "Project Management",
              "Team Leadership"
            ]}
            bigPicture="Created a solution that simplifies the course planning process for all ISU students while ensuring accessibility and inclusion. The project demonstrates the practical application of AI in improving student experiences and academic planning."
            resources={[
              "ACM Digital Library",
              "IEEE Xplore",
              "University Accessibility Office",
              "Machine Learning frameworks"
            ]}
          />
        </div>
      </section>

      {/* Additional Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-2 mb-8">
            <Code className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold">Featured Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="Smart Calendar System"
              description="Created a Raspberry Pi-based smart calendar displaying schedules, weather updates, and ISU events on an LCD screen. Designed and 3D printed a custom case for the system."
              role="Solo Developer & Designer"
              skills={[
                "Python Programming",
                "Hardware Integration",
                "3D Printing Design",
                "System Integration"
              ]}
              resources={[
                "Raspberry Pi Documentation",
                "Python Libraries",
                "3D Printing Lab"
              ]}
            />
            <ProjectCard
              title="Security Access Control System"
              description="Developed and implemented security access control features for John Deere's global platform, focusing on employee permission handling and audit processes."
              role="Security Developer"
              skills={[
                "Access Control Systems",
                "Global Software Development",
                "Security Protocols",
                "Cross-cultural Communication"
              ]}
              resources={[
                "Security Documentation",
                "Internal APIs",
                "Global Development Tools"
              ]}
            />
            <ProjectCard
              title="Hackathon Team Project"
              description="Led development of an IoT-based environmental monitoring system during ISU Hackathon, implementing real-time data collection and analysis."
              role="Technical Lead"
              skills={[
                "IoT Development",
                "Team Leadership",
                "Rapid Prototyping",
                "Real-time Data Processing"
              ]}
              resources={[
                "IoT Sensors",
                "Cloud Platforms",
                "Data Visualization Tools"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-2 mb-8">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold">Professional Experience</h2>
          </div>
          <Card>
            <CardHeader>
              <h3 className="text-2xl font-semibold">John Deere - Security Access Control Team</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Duties and Projects</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Led development of security access control systems</li>
                  <li>Collaborated with international teams across India and Germany</li>
                  <li>Optimized employee permission handling processes</li>
                  <li>Conducted security audits and implemented improvements</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Skills Learned</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Technical Skills: Security systems design, global software development, audit processes</li>
                  <li>Soft Skills: Cross-cultural communication, technical leadership, project management</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Achievements</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Reduced system audit time by 40%</li>
                  <li>Implemented new security protocols across global platforms</li>
                  <li>Led cross-functional team of 5 developers</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-2 mb-8">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold">Education & Certifications</h2>
          </div>
          <Card>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Iowa State University</h3>
                <p className="text-gray-600">B.S. in Computer Engineering, 2024</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Certifications</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>AWS Cloud Practitioner</li>
                  <li>Google Machine Learning Crash Course</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="flex items-center space-x-2 mb-8">
        <Book className="w-6 h-6 text-blue-600" />
        <h2 className="text-3xl font-bold">Academic Reflections</h2>
      </div>
      <div className="space-y-6">
        <ExpandableSection 
          title="General Education Reflection" 
          icon={<GraduationCap className="w-6 h-6 text-blue-600" />}
        >
          <div className="space-y-4 text-gray-700">
            <h4 className="font-semibold text-lg">Impact on Professional Development</h4>
            <p>
              My general education courses have been instrumental in developing a well-rounded perspective on engineering problems. These courses have helped me understand the broader implications of engineering solutions in economic, global, and societal contexts.
            </p>

            <h4 className="font-semibold text-lg">Problem-Solving Beyond Technical Aspects</h4>
            <p>
              The diverse coursework in humanities and social sciences has enhanced my ability to evaluate and formulate engineering solutions beyond purely technical considerations. For instance, my sociology coursework helped me understand how technology impacts different social groups, while economics classes provided insights into cost-benefit analysis and resource allocation in engineering projects.
            </p>

            <h4 className="font-semibold text-lg">Specific Course Impacts</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>ECON 101:</strong> Provided framework for understanding economic implications of engineering decisions, particularly in evaluating project feasibility and resource allocation
              </li>
              <li>
                <strong>SOC 134:</strong> Enhanced understanding of social impacts of technology and importance of inclusive design principles
              </li>
            </ul>

            <h4 className="font-semibold text-lg">Multidimensional Problem-Solving</h4>
            <p>
              These courses have taught me to consider multiple dimensions when approaching engineering challenges:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Economic viability and market dynamics</li>
              <li>Environmental sustainability</li>
              <li>Social responsibility and ethical considerations</li>
              <li>Cultural sensitivity in global contexts</li>
            </ul>
          </div>
        </ExpandableSection>

        <ExpandableSection 
          title="Cumulative Reflection" 
          icon={<Award className="w-6 h-6 text-blue-600" />}
        >
          <div className="space-y-4 text-gray-700">
            <h4 className="font-semibold text-lg">Big Picture Impact</h4>
            <p>
              Iowa State University has exceptionally prepared me for my engineering career through a comprehensive combination of theoretical knowledge and practical experience. The program has equipped me with:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Strong foundation in system design and process optimization</li>
              <li>Ability to recognize and solve contemporary engineering problems</li>
              <li>Effective team collaboration skills</li>
              <li>Professional communication capabilities</li>
              <li>Strong ethical decision-making framework</li>
            </ul>

            <h4 className="font-semibold text-lg">External Learning Resources</h4>
            <p>
              Throughout my academic journey, I've actively sought knowledge beyond classroom materials through:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Regular consultation of IEEE and ACM digital libraries</li>
              <li>Participation in industry webinars and conferences</li>
              <li>Collaboration with industry professionals during internships</li>
              <li>Active engagement with online learning platforms</li>
            </ul>

            <h4 className="font-semibold text-lg">Extra-Curricular Growth</h4>
            <p>
              My involvement in various activities outside the classroom has significantly contributed to my professional development:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Computer Engineering Club leadership role</li>
              <li>IEEE student branch participation</li>
              <li>Hackathon competitions</li>
              <li>Industry networking events</li>
            </ul>

            <h4 className="font-semibold text-lg">Professional Development</h4>
            <p>
              I've consistently worked to update my skills through:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>AWS certification pursuit</li>
              <li>Machine learning specialization courses</li>
              <li>Leadership training during internships</li>
              <li>Technical workshop participation</li>
            </ul>

            <h4 className="font-semibold text-lg">Retrospective Insights</h4>
            <p>
              If I were to repeat my undergraduate experience, I would:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Engage in research opportunities earlier</li>
              <li>Participate in more interdisciplinary projects</li>
              <li>Seek more international collaboration opportunities</li>
              <li>Focus more on emerging technologies</li>
            </ul>
          </div>
        </ExpandableSection>

        <ExpandableSection 
          title="Ethics Paper" 
          icon={<FileText className="w-6 h-6 text-blue-600" />}
        >
          <div className="space-y-4 text-gray-700">
            <h4 className="font-semibold text-lg">Importance of Ethics in Engineering</h4>
            <p>
              A "Code of Ethics" is vital to the success and general well-being of everyone involved with any sort of work needing to be done. This ethical code provides a framework of principles and guidelines that act as a moral compass for any dispute or situation that may arise.
            </p>

            <h4 className="font-semibold text-lg">Personal Approach to Ethical Decision-Making</h4>
            <p>
              When an ethically questionable situation arises, I strive to adhere to both the established code of ethics and my intuition. It is important to consider the impact of decisions on everyone involved, including partners, employees, companies, and the greater community.
            </p>

            <h4 className="font-semibold text-lg">Case Studies and Learning</h4>
            <p>
              Throughout CprE 394, we explored various ethical issues, including:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>The Big Data Issue</li>
              <li>Amazon Echo Privacy Concerns</li>
              <li>Volkswagen Emissions Case</li>
            </ul>

            <h4 className="font-semibold text-lg">Core Ethical Virtues</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Integrity in all professional dealings</li>
              <li>Responsibility for actions and decisions</li>
              <li>Honesty in communication and practice</li>
            </ul>

            <h4 className="font-semibold text-lg">Conclusion</h4>
            <p>
              Adherence to a Code of Ethics and consideration of the Virtue of Ethics are crucial for navigating ethical dilemmas. By incorporating these principles into decision-making processes, engineers can contribute to a culture of integrity, responsibility, and honesty within their professional and academic pursuits.
            </p>
          </div>
        </ExpandableSection>
      </div>
    </div>
  </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#resume" className="text-gray-400 hover:text-white transition-colors">Resume</a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
                </li>
                <li>
                  <a href="#experience" className="text-gray-400 hover:text-white transition-colors">Experience</a>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>kobyfowler@email.com</span>
                </li>
                <li>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn Profile</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Profile</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Copyright and Additional Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <p className="text-gray-400 mb-4">
                Portfolio created as part of CprE 494 at Iowa State University.
              </p>
              <p className="text-gray-400">
                © 2024 Koby Fowler. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
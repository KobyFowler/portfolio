import React, { useState, useEffect } from 'react';
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
  ChevronDown,
  ExternalLink,
  Building,
  FileSpreadsheet
} from 'lucide-react';

// Card Components
const Card = ({ children, className = '', hover = false }) => (
  <div className={`bg-white rounded-lg shadow-md transition-all duration-300 ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''} ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// ExpandableSection Component
const ExpandableSection = ({ title, children, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="text-2xl font-semibold">{title}</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6 text-gray-500 transition-transform duration-300" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-500 transition-transform duration-300" />
        )}
      </button>
      <div 
        className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
};


// ProjectCard Component
const ProjectCard = ({ title, description, role, skills, bigPicture = '', resources = [] }) => (
  <Card hover className="h-full flex flex-col">
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
        <h4 className="font-semibold text-gray-800 mb-2">Skills Gained</h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      {bigPicture && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Impact</h4>
          <p className="text-gray-600">{bigPicture}</p>
        </div>
      )}
      {resources.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Resources</h4>
          <div className="flex flex-wrap gap-2">
            {resources.map((resource, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {resource}
              </span>
            ))}
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

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
      className={`fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
};

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Updated to be more welcoming */}
      <header className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">Welcome to My Engineering Portfolio</h1>
            <h2 className="text-3xl mb-4 animate-fade-in">Koby Fowler</h2>
            <p className="text-xl mb-8 animate-fade-in-delayed">Computer Engineering Graduate - Iowa State University</p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href="mailto:kobymfowler@outlook.com" 
                className="hover:text-blue-200 transition-colors flex items-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>kobymfowler@outlook.com</span>
              </a>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/KobyFowler" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-blue-200 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="https://linkedin.com/in/koby-fowler" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-blue-200 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Career Objective - Updated with more detailed future goals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-2 mb-8">
            <Lightbulb className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold">Career Objective</h2>
          </div>
          <Card hover>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-lg">
                As a recent Computer Engineering graduate from Iowa State University, I am passionate about combining software and hardware solutions to create innovative systems. I aim to contribute to projects that push technological boundaries while maintaining a strong focus on accessibility and user experience. My goal is to work on AI and embedded systems that make a meaningful impact on society, leveraging my experience in security infrastructure and machine learning to create robust, ethical solutions. I'm particularly interested in pursuing opportunities that allow me to continue learning and growing while mentoring others, just as I did as a TA during my time at Iowa State.
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
          />
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-2 mb-8">
            <Code className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold">Featured Projects</h2>
          </div>
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

      {/* Work Experience */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-2 mb-8">
            <Building className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold">Professional Experience</h2>
          </div>
          <Card hover>
            <CardHeader>
              <h3 className="text-xl font-semibold">John Deere - Security Developer Intern</h3>
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
                <h4 className="font-semibold text-gray-800 mb-2">Skills Learned</h4>
                <div className="space-y-2">
                  <p className="text-gray-600"><strong>Technical Skills:</strong> Security protocols, API design, global software development, audit compliance</p>
                  <p className="text-gray-600"><strong>Soft Skills:</strong> Cross-cultural communication, project management, technical presentation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Academic Reflections */}
      <section id="reflections" className="py-16 bg-white">
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
                <p>My general education courses have been instrumental in developing a well-rounded perspective on engineering problems. Through these courses, I've learned to evaluate and formulate engineering solutions that consider not just technical aspects, but also economic, global, and societal contexts.</p>
                
                <h4 className="font-semibold mt-4">Impact on Problem Solving</h4>
                <p>My economics courses helped me understand the financial implications of engineering decisions, while my sociology courses taught me to consider the broader social impact of technological solutions. These perspectives have become invaluable when approaching engineering challenges, as they've taught me to consider not just the technical feasibility but also the societal implications and economic viability of potential solutions.</p>
                
                <h4 className="font-semibold mt-4">Beyond Technical Solutions</h4>
                <p>For example, through my economics coursework, I learned to evaluate the cost-benefit analysis of different engineering approaches, which proved particularly valuable during my internship at John Deere when working on security access control systems. My sociology classes helped me understand the importance of considering diverse user needs and accessibility requirements in our senior design project, ensuring our AI scheduling system would be useful for all students, not just those with technical backgrounds.</p>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title="Cumulative Reflection" 
              icon={<FileText className="w-6 h-6 text-blue-600" />}
            >
              <div className="space-y-4 text-gray-700">
                <p>Looking back at my time in Iowa State's Computer Engineering program, I can honestly say it's been quite a ride. Between the late nights coding, countless cups of coffee at Parks Library, and amazing friendships formed during group projects, I've grown so much both as an engineer and as a person. The program threw everything at us - from intense coursework to hands-on projects - and somehow, I made it through with skills I never thought I'd have.</p>

                <h4 className="font-semibold mt-4">Freshman Year Highlight</h4>
                <p>One of my favorite experiences came during my freshman year in CPRE 186. I created this smart calendar project that combined Python programming with hardware integration on a Raspberry Pi. I remember being so excited to design and 3D print a custom case for it in the Computation Lab - it took a few tries to get the measurements just right! The project basically displayed my schedule, weather updates, and ISU events on an LCD screen.</p>

                <h4 className="font-semibold mt-4">Senior Design Experience</h4>
                <p>Senior design (CPRE 491/492) was definitely the highlight of my academic experience. My team and I created an AI-powered schedule planner for Iowa State students. We wanted to solve a real problem we all faced - the stress of planning future semesters. Our system uses AI to analyze course patterns, prerequisites, and even preferred class times to suggest optimized schedules.</p>

                <h4 className="font-semibold mt-4">Professional Growth</h4>
                <p>During my time at John Deere, I worked on their security access control team, where I saw firsthand how engineering decisions impact both economic and environmental factors. We developed software for optimal security control, which not only helped reduce management time and make employee permission handling easier but saved the company money during auditing periods for such access controls.</p>

                <h4 className="font-semibold mt-4">Looking Forward</h4>
                <p>If I could do it all over again, I'd probably get involved in research earlier. I didn't realize until later how cool some of the projects were that professors were working on. I'd also try to work with students from other majors more - some of the best ideas come from combining different perspectives.</p>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title="Ethics Essay" 
              icon={<FileSpreadsheet className="w-6 h-6 text-blue-600" />}
            >
              <div className="space-y-4 text-gray-700">
                <p>A "Code of Ethics" though heavily saturated in today's workforce is vital to the success and general well being of everyone involved with any sort of work. This ethical code provides a framework of principles and guidelines that act as a moral compass for any dispute or situation that may arise. The outlining of these values and responsibilities will create an environment to nurture trust, integrity, and accountability.</p>

                <h4 className="font-semibold mt-4">Personal Approach to Ethics</h4>
                <p>When an ethically questionable situation arises I try my best to adhere to both the established code of ethics, whether this is IEEE Code of Ethics or a particular code laid out by a company, but also my intuition. It is important to consider the impact of my decisions on everyone involved, this could be partners, employees, a company, or the greater community.</p>

                <h4 className="font-semibold mt-4">Course Impact</h4>
                <p>Throughout the course of CprE 394 we discussed many ethical issues from large to small. These included but aren't limited to the Big Data Issue, Amazon Echo Issue, and the Volkswagen Issue. These large scale issues differed heavily from my personal experiences and left lessons of a diverse set of ethical decision-making.</p>

                <h4 className="font-semibold mt-4">Key Virtues</h4>
                <p>In reflecting on the "Virtue of Ethics" within the context of a case study, three virtues stand out as particularly relevant: integrity, responsibility, and honesty. These virtues align with the principles upheld in the case study, emphasizing the importance of maintaining one's integrity, taking responsibility for actions, and being honest in all dealings.</p>
              </div>
            </ExpandableSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#projects" className="footer-link block">Projects</a>
                <a href="#experience" className="footer-link block">Experience</a>
                <a href="#education" className="footer-link block">Education</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2">
                <a href="mailto:kobymfowler@outlook.com" className="footer-link block">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </a>
                <a href="https://github.com/KobyFowler" className="footer-link block">
                  <Github className="w-4 h-4 inline mr-2" />
                  GitHub
                </a>
                <a href="https://linkedin.com/in/koby-fowler" className="footer-link block">
                  <Linkedin className="w-4 h-4 inline mr-2" />
                  LinkedIn
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

export default Portfolio;
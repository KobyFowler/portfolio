import React from 'react';

// Alert Component
export const Alert = ({ children, className = "" }) => {
  return (
    <div className={`rounded-lg border p-4 ${className}`} role="alert">
      {children}
    </div>
  );
};

// Alert Description Component
export const AlertDescription = ({ children, className = "" }) => {
  return (
    <div className={`text-sm [&_p]:leading-relaxed ${className}`}>
      {children}
    </div>
  );
};

// Card Components
export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Contact Form Component
export const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors duration-200"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors duration-200"
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors duration-200"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg
                 hover:bg-blue-600 transition-colors duration-200"
      >
        Send Message
      </button>
    </form>
  );
};

// Essays Section Component
export const EssaysSection = () => {
  const essays = [
    {
      title: "Modern Web Development",
      description: "Exploring the latest trends and best practices in web development.",
      date: "2024-03-15",
      readTime: "5 min read"
    },
    {
      title: "The Future of AI",
      description: "Insights into artificial intelligence and its impact on software engineering.",
      date: "2024-02-28",
      readTime: "8 min read"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-12">
        <div className="p-3 bg-blue-500/20 rounded-lg">
          <ScrollText className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-4xl font-bold">Technical Essays</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {essays.map((essay, index) => (
          <div
            key={index}
            className="group bg-gray-800/50 rounded-xl p-6 border border-gray-700
                     hover:border-blue-500 transition-all duration-300"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                {essay.title}
              </h3>
              <p className="text-gray-400">{essay.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{essay.date}</span>
                <span>{essay.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// OpenMCT Section Component
export const OpenMCTSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-12">
        <div className="p-3 bg-blue-500/20 rounded-lg">
          <Terminal className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-4xl font-bold">OpenMCT Integration</h2>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
        <div className="prose prose-invert max-w-none">
          <h3 className="text-2xl font-bold mb-4">
            NASA's Mission Control Framework
          </h3>
          <p className="text-gray-300 mb-6">
            Experience with integrating and customizing NASA's Open Mission Control 
            Technologies (OpenMCT) framework for modern telemetry visualization and analysis.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-blue-400">Key Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Real-time telemetry visualization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Custom plugin development
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Data dictionary integration
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-blue-400">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "Vue.js", "WebSocket", "REST API"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default {
  Alert,
  AlertDescription,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  ContactForm,
  EssaysSection,
  OpenMCTSection
};
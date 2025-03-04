// src/components/ui/essays-section.jsx
import React from 'react';
import { ScrollText } from 'lucide-react';

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
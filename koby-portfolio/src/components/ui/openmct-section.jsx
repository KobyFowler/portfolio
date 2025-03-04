// src/components/ui/openmct-section.jsx
import React from 'react';
import { Terminal } from 'lucide-react';

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
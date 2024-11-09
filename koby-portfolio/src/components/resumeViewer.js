// Create a new file: src/components/ResumeViewer.js

import React, { useState } from 'react';
import { Download, Maximize2, Minimize2, Loader, FileText } from 'lucide-react';

const ResumeViewer = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div 
        className={`relative w-full transition-all duration-300 ease-in-out
          ${isFullscreen ? 'fixed inset-0 z-50 bg-black/90' : 'max-w-3xl h-[600px]'}`}
      >
        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        )}
        
        {/* PDF Viewer */}
        <div className={`relative ${isFullscreen ? 'h-screen p-4' : 'h-[600px]'}`}>
          <iframe
            src="/portfolio/resume.pdf#view=FitH"
            className="w-full h-full rounded-lg"
            title="Resume Preview"
            onLoad={() => setIsLoading(false)}
          />
          
          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 p-2 bg-blue-600 text-white rounded-full
                     shadow-lg hover:bg-blue-700 transition-all duration-300"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Download Controls */}
      <div className="flex gap-4">
        <a
          href="/portfolio/resume.pdf"
          download="Koby_Fowler_Resume.pdf"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full
                   shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
        >
          <Download className="w-5 h-5 mr-2" />
          Download PDF
        </a>
        <a
          href="/portfolio/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-full
                   shadow-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105"
        >
          <FileText className="w-5 h-5 mr-2" />
          Open in New Tab
        </a>
      </div>
    </div>
  );
};

export default ResumeViewer;
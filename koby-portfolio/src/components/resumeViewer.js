import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, Maximize2, Minimize2, Loader, FileText,
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut,
  Share2, Printer, Eye, EyeOff
} from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

const EnhancedResumeViewer = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showControls, setShowControls] = useState(true);
  
  // Use refs for stable references
  const iframeRef = useRef(null);
  const pdfUrl = useRef(`${window.location.origin}/resume.pdf#view=FitH`);
  
  // Handle fullscreen keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  // Handle iframe load events
  const handleIframeLoad = () => {
    // Check if we loaded the PDF or got redirected to the app
    if (iframeRef.current) {
      try {
        // If we can access the contentDocument, it might be the app, not the PDF
        // This may throw a cross-origin error if it's actually a PDF
        const doc = iframeRef.current.contentDocument;
        
        // If we can see the document and it contains our app elements, it failed
        if (doc && (doc.getElementById('root') || doc.querySelector('header'))) {
          setLoadError(true);
        } else {
          setLoadError(false);
        }
      } catch (error) {
        // A security error here often means the PDF loaded correctly
        // (PDFs are often treated as cross-origin content)
        setLoadError(false);
      }
    }
    
    setIsLoading(false);
  };
  
  // Handle iframe load errors
  const handleIframeError = () => {
    setLoadError(true);
    setIsLoading(false);
  };

  const handleZoom = (increment) => {
    setZoomLevel(prev => {
      const newZoom = prev + increment;
      return Math.min(Math.max(50, newZoom), 200);
    });
  };

  const handlePrint = () => {
    window.open('/resume.pdf', '_blank');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Koby Fowler Resume',
        text: 'Check out my professional resume',
        url: '/resume.pdf'
      });
    } catch (error) {
      console.log('Error sharing:', error);
      // Fallback for browsers that don't support sharing
      window.open('/resume.pdf', '_blank');
    }
  };

  // Display error view if PDF loading fails
  if (loadError) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <Alert className="mb-4 bg-blue-500/10 border-blue-500/20">
          <AlertDescription>
            Unable to display the PDF viewer. Please download the resume directly.
          </AlertDescription>
        </Alert>
        
        <div className="bg-gray-800/50 rounded-xl p-12 border border-gray-700 text-center">
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
              <FileText className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Resume Preview</h3>
            <p className="text-gray-300 mb-6">
              PDF preview is unavailable. Please use one of the options below to view my resume.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/resume.pdf"
              download="Koby_Fowler_Resume.pdf"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white 
                       rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 
                       hover:scale-105 gap-2"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
            
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-700 text-white 
                       rounded-full shadow-lg hover:bg-gray-600 transition-all duration-300 
                       hover:scale-105 gap-2"
            >
              <FileText className="w-5 h-5" />
              Open in New Tab
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Alert className="mb-4 bg-blue-500/10 border-blue-500/20">
        <AlertDescription>
          For the best viewing experience, use the fullscreen mode or download the PDF.
        </AlertDescription>
      </Alert>

      <div 
        className={`relative transition-all duration-300 ease-in-out
          ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900/95' : 'h-[800px] rounded-xl overflow-hidden'}`}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/50 backdrop-blur-sm">
            <Loader className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-blue-400">Loading resume...</p>
          </div>
        )}

        {/* Main Content */}
        <div className="relative w-full h-full">
          <object
            ref={iframeRef}
            data={pdfUrl.current}
            type="application/pdf"
            className={`w-full h-full transition-transform duration-300`}
            style={{ transform: `scale(${zoomLevel / 100})` }}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          >
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-400">
                Unable to display PDF. <a href="/resume.pdf" className="text-blue-400 underline">Download</a> instead.
              </p>
            </div>
          </object>

          {/* Floating Controls */}
          {showControls && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 
                         flex items-center gap-4 px-6 py-3 bg-gray-900/90 backdrop-blur-sm 
                         rounded-full border border-gray-700 shadow-xl z-10">
              {/* Page Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm">Page {currentPage}</span>
                <button
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="w-px h-6 bg-gray-700" />

              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleZoom(-10)}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <span className="text-sm">{zoomLevel}%</span>
                <button
                  onClick={() => handleZoom(10)}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>

              <div className="w-px h-6 bg-gray-700" />

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Print resume"
                >
                  <Printer className="w-5 h-5" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Share resume"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Toggle fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* Toggle Controls Button */}
          <button
            onClick={() => setShowControls(!showControls)}
            className="absolute top-4 right-4 p-2 bg-gray-900/90 backdrop-blur-sm 
                     rounded-full border border-gray-700 shadow-lg 
                     hover:bg-gray-800 transition-all duration-300 z-10"
            aria-label="Toggle controls"
          >
            {showControls ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Download Options */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <a
          href="/resume.pdf"
          download="Koby_Fowler_Resume.pdf"
          className="inline-flex items-center px-6 py-3 bg-blue-500 text-white 
                   rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 
                   hover:scale-105 gap-2"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gray-700 text-white 
                   rounded-full shadow-lg hover:bg-gray-600 transition-all duration-300 
                   hover:scale-105 gap-2"
        >
          <FileText className="w-5 h-5" />
          Open in New Tab
        </a>
      </div>
    </div>
  );
};

export default EnhancedResumeViewer;
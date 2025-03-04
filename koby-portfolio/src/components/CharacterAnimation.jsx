import React, { useState, useEffect } from 'react';
import { Coffee, Terminal, Code } from 'lucide-react';

const CharacterAnimation = () => {
  const [animationState, setAnimationState] = useState('idle');
  
  useEffect(() => {
    // Cycle through animations
    const interval = setInterval(() => {
      setAnimationState((prev) => {
        switch(prev) {
          case 'idle': return 'run';
          case 'run': return 'victory';
          default: return 'idle';
        }
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
      
      {/* Character body */}
      <div 
        className={`relative w-32 h-32 bg-blue-500/30 rounded-full flex items-center justify-center
                   border-4 border-blue-500/30 overflow-hidden
                   ${animationState === 'idle' ? 'animate-idle' : 
                     animationState === 'run' ? 'animate-run' : 'animate-victory'}`}
      >
        {/* Change icon based on animation state */}
        {animationState === 'idle' && (
          <Coffee className="w-16 h-16 text-blue-100" />
        )}
        {animationState === 'run' && (
          <Code className="w-16 h-16 text-blue-100" />
        )}
        {animationState === 'victory' && (
          <Terminal className="w-16 h-16 text-blue-100" />
        )}
      </div>
      
      {/* Animation state label */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm bg-blue-500/20 px-3 py-1 rounded-full text-blue-300">
        {animationState === 'idle' ? 'thinking' : 
         animationState === 'run' ? 'coding' : 'solved!'}
      </div>
    </div>
  );
};

export default CharacterAnimation;
import React from 'react';

export const HowToPlay: React.FC = () => {
  return (
    <div className="w-full max-w-sm px-2">
      {/* Soft divider */}
      <div className="w-16 h-px bg-white/20 mx-auto mb-4"></div>
      
      <div className="bg-black/20 rounded-2xl border border-white/10 p-5 sm:p-6 shadow-2xl backdrop-blur-sm">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4 text-left">
          How to Play
        </h3>
        
        <div className="space-y-3 text-sm sm:text-base text-white/80 leading-relaxed">
          <div className="flex items-start space-x-3">
            <span className="text-white/40 mt-0.5 flex-shrink-0">•</span>
            <span>Click two tiles that are identical OR sum to 10</span>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="text-white/40 mt-0.5 flex-shrink-0">•</span>
            <span>Tiles must be adjacent (including diagonally)</span>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="text-white/40 mt-0.5 flex-shrink-0">•</span>
            <span>OR at opposite ends of the same row with no tiles between</span>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="text-white/40 mt-0.5 flex-shrink-0">•</span>
            <span>Matched tiles disappear and you earn points</span>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="text-white/40 mt-0.5 flex-shrink-0">•</span>
            <span>Add new rows when no matches are available</span>
          </div>
        </div>
      </div>
    </div>
  );
};
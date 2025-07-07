import React from 'react';

export const HowToPlay: React.FC = () => {
  return (
    <div className="w-full max-w-sm px-2">
      {/* Soft divider */}
      <div className="w-16 h-px bg-gray-200 mx-auto mb-3 sm:mb-4"></div>
      
      <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-sm">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 text-left">
          How to Play
        </h3>
        
        <div className="space-y-2 text-sm sm:text-base text-gray-600 leading-relaxed">
          <div className="flex items-start space-x-2">
            <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span>
            <span>Click two tiles that are identical OR sum to 10</span>
          </div>
          
          <div className="flex items-start space-x-2">
            <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span>
            <span>Tiles must be adjacent (including diagonally)</span>
          </div>
          
          <div className="flex items-start space-x-2">
            <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span>
            <span>OR at opposite ends of the same row with no tiles between</span>
          </div>
          
          <div className="flex items-start space-x-2">
            <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span>
            <span>Matched tiles disappear and you earn points</span>
          </div>
          
          <div className="flex items-start space-x-2">
            <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span>
            <span>Reset the rows when no matches are available</span>
          </div>
        </div>
      </div>
    </div>
  );
};
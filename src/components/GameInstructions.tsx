import React from 'react';

export const GameInstructions: React.FC = () => {
  return (
    <div className="w-full max-w-sm px-2">
      <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-sm">
        <div className="space-y-3 text-sm text-gray-600">
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Valid Matches</h4>
            <p className="text-xs sm:text-sm leading-relaxed">Identical numbers or pairs that sum to 10</p>
          </div>
          
          <div className="w-12 h-px bg-gray-200 mx-auto"></div>
          
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Valid Positions</h4>
            <p className="text-xs sm:text-sm leading-relaxed">Adjacent tiles or opposite ends of the same row</p>
          </div>
        </div>
      </div>
    </div>
  );
};
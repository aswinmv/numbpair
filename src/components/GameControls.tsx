import React from 'react';
import { Play, RotateCcw, Lightbulb, Plus } from 'lucide-react';

interface GameControlsProps {
  gameStarted: boolean;
  hasAvailableMatches: boolean;
  onStartGame: () => void;
  onResetGame: () => void;
  onAddRow: () => void;
  onGetHint: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  gameStarted,
  hasAvailableMatches,
  onStartGame,
  onResetGame,
  onAddRow,
  onGetHint
}) => {
  const buttonClasses = `
    inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium
    rounded-xl transition-all duration-200 border-2
    hover:scale-105 active:scale-95 shadow-sm
    touch-manipulation min-h-[44px] min-w-[44px]
  `;

  const primaryButton = `
    ${buttonClasses}
    bg-gray-900 text-white border-gray-900
    hover:bg-gray-800 hover:shadow-md
    active:bg-gray-800
  `;

  const secondaryButton = `
    ${buttonClasses}
    bg-white text-gray-700 border-gray-200
    hover:bg-gray-50 hover:border-gray-300 hover:shadow-md
    active:bg-gray-100
  `;

  const hintButton = `
    ${buttonClasses}
    bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200
    hover:from-blue-100 hover:to-purple-100 hover:border-blue-300 hover:shadow-md
    hover:text-blue-800 active:from-blue-200 active:to-purple-200
  `;

  const accentButton = `
    ${buttonClasses}
    bg-green-50 text-green-700 border-green-200
    hover:bg-green-100 hover:border-green-300 hover:shadow-md
    active:bg-green-200
  `;

  if (!gameStarted) {
    return (
      <div className="w-full max-w-sm flex justify-center">
        <button onClick={onStartGame} className={primaryButton}>
          <Play className="w-4 h-4" />
          <span>Start Game</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm flex justify-center">
      <div className="flex gap-2 flex-wrap justify-center">
        {!hasAvailableMatches && (
          <button onClick={onAddRow} className={accentButton}>
            <Plus className="w-4 h-4" />
            <span>Add Row</span>
          </button>
        )}
        
        <button onClick={onGetHint} className={hintButton}>
          <Lightbulb className="w-4 h-4" />
          <span>Hint</span>
        </button>
        
        <button onClick={onResetGame} className={secondaryButton}>
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
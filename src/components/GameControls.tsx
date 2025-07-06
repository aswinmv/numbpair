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
    inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium
    rounded-2xl transition-all duration-300 border
    hover:scale-105 active:scale-95 shadow-lg
    touch-manipulation min-h-[56px] min-w-[56px]
  `;

  const homeScreenButton = `
    ${buttonClasses}
    bg-white text-black border-white font-bold text-lg
    hover:bg-gray-100 hover:shadow-xl
    active:bg-gray-200 px-12 py-4
    shadow-2xl
  `;

  const primaryButton = `
    ${buttonClasses}
    bg-white text-black border-white
    hover:bg-gray-100 hover:shadow-xl
    active:bg-gray-200
  `;

  const secondaryButton = `
    ${buttonClasses}
    bg-gray-800 text-white border-gray-700
    hover:bg-gray-700 hover:border-gray-600 hover:shadow-xl
    active:bg-gray-600
  `;

  const hintButton = `
    ${buttonClasses}
    bg-gray-800 text-white border-gray-700
    hover:bg-gray-700 hover:border-gray-600 hover:shadow-xl
    active:bg-gray-600
  `;

  const accentButton = `
    ${buttonClasses}
    bg-white text-black border-white
    hover:bg-gray-100 hover:shadow-xl
    active:bg-gray-200
  `;

  if (!gameStarted) {
    return (
      <div className="w-full max-w-sm flex justify-center">
        <button onClick={onStartGame} className={homeScreenButton}>
          <Play className="w-5 h-5" />
          <span>PLAY</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm flex justify-center">
      <div className="flex gap-3 flex-wrap justify-center">
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
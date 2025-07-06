import React from 'react';
import { GameStats } from '../hooks/useGameLogic';

interface ScoreBoardProps {
  gameStats: GameStats;
  hasAvailableMatches: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  gameStats,
  hasAvailableMatches
}) => {
  const { score, moves } = gameStats;

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-center space-x-4 sm:space-x-6 px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">Score</p>
          <p className="text-lg sm:text-xl font-light text-gray-900">{score}</p>
        </div>
        
        <div className="w-px h-6 sm:h-8 bg-gray-200"></div>
        
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">Moves</p>
          <p className="text-lg sm:text-xl font-light text-gray-900">{moves}</p>
        </div>
        
        <div className="w-px h-6 sm:h-8 bg-gray-200"></div>
        
        <div className="text-center">
          <div className={`w-2.5 h-2.5 rounded-full mx-auto mb-0.5 ${hasAvailableMatches ? 'bg-green-400' : 'bg-orange-400'}`}></div>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
            {hasAvailableMatches ? 'Active' : 'No Matches'}
          </p>
        </div>
      </div>
    </div>
  );
};
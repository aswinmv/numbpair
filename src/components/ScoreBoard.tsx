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
      <div className="flex items-center justify-center space-x-6 sm:space-x-8 px-6 sm:px-8 py-3 sm:py-4 bg-black/20 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <p className="text-xs text-white/60 uppercase tracking-wider font-medium mb-1">Score</p>
          <p className="text-xl sm:text-2xl font-light text-white">{score}</p>
        </div>
        
        <div className="w-px h-8 sm:h-10 bg-white/20"></div>
        
        <div className="text-center">
          <p className="text-xs text-white/60 uppercase tracking-wider font-medium mb-1">Moves</p>
          <p className="text-xl sm:text-2xl font-light text-white">{moves}</p>
        </div>
        
        <div className="w-px h-8 sm:h-10 bg-white/20"></div>
        
        <div className="text-center">
          <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${hasAvailableMatches ? 'bg-white' : 'bg-white/40'}`}></div>
          <p className="text-xs text-white/60 uppercase tracking-wider font-medium">
            {hasAvailableMatches ? 'Active' : 'No Moves'}
          </p>
        </div>
      </div>
    </div>
  );
};
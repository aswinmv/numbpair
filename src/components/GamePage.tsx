import React from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { GameGrid } from './GameGrid';
import { GameControls } from './GameControls';
import { ScoreBoard } from './ScoreBoard';
import { HowToPlay } from './HowToPlay';
import { Footer } from './Footer';
import { ArrowLeft } from 'lucide-react';

interface GamePageProps {
  onBackToHome: () => void;
}

export const GamePage: React.FC<GamePageProps> = ({ onBackToHome }) => {
  const {
    grid,
    selectedTiles,
    gameStats,
    animatingTiles,
    selectTile,
    startGame,
    resetGame,
    addNewRow,
    showHint,
    hasAvailableMatches,
    isTileSelected,
    isTileHinted
  } = useGameLogic();

  const handleHint = () => {
    showHint();
  };

  // Auto-start game when component mounts
  React.useEffect(() => {
    if (!gameStats.gameStarted) {
      startGame();
    }
  }, [gameStats.gameStarted, startGame]);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gray-50 flex flex-col overflow-hidden">
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-3 py-2 sm:py-3 overflow-hidden">
        <div className="w-full max-w-sm sm:max-w-md space-y-2 sm:space-y-3 flex flex-col items-center h-full justify-center">
          
          {/* Header with Back Button - Centered */}
          <div className="text-center space-y-1 flex-shrink-0 relative w-full">
            <button
              onClick={onBackToHome}
              className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-black tracking-wide font-space-grotesk">
              Numbpair
            </h1>
          </div>

          {/* Score Board - Centered */}
          <div className="flex justify-center flex-shrink-0 w-full">
            <ScoreBoard 
              gameStats={gameStats} 
              hasAvailableMatches={hasAvailableMatches}
            />
          </div>

          {/* Game Controls - Centered */}
          <div className="flex justify-center flex-shrink-0 w-full">
            <GameControls
              gameStarted={gameStats.gameStarted}
              hasAvailableMatches={hasAvailableMatches}
              onStartGame={startGame}
              onResetGame={resetGame}
              onAddRow={addNewRow}
              onGetHint={handleHint}
            />
          </div>

          {/* Game Grid - Centered */}
          <div className="flex justify-center flex-1 w-full min-h-0 items-center">
            <GameGrid
              grid={grid}
              animatingTiles={animatingTiles}
              isTileSelected={isTileSelected}
              isTileHinted={isTileHinted}
              onTileClick={selectTile}
            />
          </div>

          {/* How to Play - Centered */}
          <div className="flex justify-center flex-shrink-0 w-full">
            <HowToPlay />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer gameStarted={gameStats.gameStarted} />
    </div>
  );
};
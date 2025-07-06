import React from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { GameGrid } from './components/GameGrid';
import { GameControls } from './components/GameControls';
import { ScoreBoard } from './components/ScoreBoard';
import { HowToPlay } from './components/HowToPlay';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';

function App() {
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

  // Show home screen when game is not started
  if (!gameStats.gameStarted) {
    return <HomeScreen onStartGame={startGame} />;
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gray-50 flex flex-col overflow-hidden">
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-3 py-2 sm:py-3 overflow-hidden">
        <div className="w-full max-w-sm sm:max-w-md space-y-2 sm:space-y-3 flex flex-col items-center h-full justify-center">
          
          {/* Header - Centered */}
          <div className="text-center space-y-1 flex-shrink-0">
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

          {/* Add Row Button - Only show when no matches available */}
          {!hasAvailableMatches && (
            <div className="flex justify-center flex-shrink-0 w-full">
              <button 
                onClick={addNewRow} 
                className="inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium rounded-xl transition-all duration-200 border-2 hover:scale-105 active:scale-95 shadow-sm touch-manipulation min-h-[44px] min-w-[44px] bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300 hover:shadow-md active:bg-green-200"
              >
                <span className="text-lg">+</span>
                <span>Add Row</span>
              </button>
            </div>
          )}

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

          {/* Hint and Reset Buttons - Below Game Grid */}
          <div className="flex justify-center flex-shrink-0 w-full">
            <div className="flex gap-2 flex-wrap justify-center">
              <button 
                onClick={handleHint} 
                className="inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium rounded-xl transition-all duration-200 border-2 hover:scale-105 active:scale-95 shadow-sm touch-manipulation min-h-[44px] min-w-[44px] bg-gray-900 text-white border-gray-900 hover:bg-gray-800 hover:shadow-md active:bg-gray-800"
              >
                <span className="text-lg">💡</span>
                <span>Hint</span>
              </button>
              
              <button 
                onClick={resetGame} 
                className="inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium rounded-xl transition-all duration-200 border-2 hover:scale-105 active:scale-95 shadow-sm touch-manipulation min-h-[44px] min-w-[44px] bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md active:bg-gray-100"
              >
                <span className="text-lg">↻</span>
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* How to Play - Centered */}
          <div className="flex justify-center flex-shrink-0 w-full">
            <HowToPlay />
          </div>
        </div>
      </div>

      {/* Footer - Only show during gameplay */}
      <Footer gameStarted={gameStats.gameStarted} />
    </div>
  );
}

export default App;
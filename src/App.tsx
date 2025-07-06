import React from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { GameGrid } from './components/GameGrid';
import { GameControls } from './components/GameControls';
import { ScoreBoard } from './components/ScoreBoard';
import { HowToPlay } from './components/HowToPlay';
import { Footer } from './components/Footer';

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

  return (
    <div className={`min-h-screen min-h-[100dvh] flex flex-col overflow-hidden ${
      !gameStats.gameStarted 
        ? 'gradient-home-bg' 
        : 'bg-gray-50'
    }`}>
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-3 py-2 sm:py-3 overflow-hidden">
        <div className="w-full max-w-sm sm:max-w-md space-y-2 sm:space-y-3 flex flex-col items-center h-full justify-center">
          
          {/* Header - Centered */}
          <div className="text-center space-y-1 flex-shrink-0">
            <h1 className={`text-2xl sm:text-2xl md:text-3xl font-bold tracking-wide ${
              !gameStats.gameStarted 
                ? 'text-white drop-shadow-lg' 
                : 'text-black'
            }`}>
              Numbpair
            </h1>
            {!gameStats.gameStarted && (
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed px-4 drop-shadow-md">
                Match identical numbers or pairs that sum to 10
              </p>
            )}
          </div>

          {/* Score Board - Centered */}
          {gameStats.gameStarted && (
            <div className="flex justify-center flex-shrink-0 w-full">
              <ScoreBoard 
                gameStats={gameStats} 
                hasAvailableMatches={hasAvailableMatches}
              />
            </div>
          )}

          {/* Game Controls - Centered (only when game is active) */}
          {gameStats.gameStarted && (
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
          )}

          {/* Game Grid - Centered */}
          {gameStats.gameStarted && (
            <div className="flex justify-center flex-1 w-full min-h-0 items-center">
              <GameGrid
                grid={grid}
                animatingTiles={animatingTiles}
                isTileSelected={isTileSelected}
                isTileHinted={isTileHinted}
                onTileClick={selectTile}
              />
            </div>
          )}

          {/* Start Game Button - Positioned below title for better mobile access */}
          {!gameStats.gameStarted && (
            <div className="flex justify-center flex-shrink-0 w-full pt-4">
              <GameControls
                gameStarted={gameStats.gameStarted}
                hasAvailableMatches={hasAvailableMatches}
                onStartGame={startGame}
                onResetGame={resetGame}
                onAddRow={addNewRow}
                onGetHint={handleHint}
              />
            </div>
          )}

          {/* How to Play - Centered (when game is active) */}
          {gameStats.gameStarted && (
            <div className="flex justify-center flex-shrink-0 w-full">
              <HowToPlay />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
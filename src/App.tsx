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
        ? 'minimal-dark-bg' 
        : 'bg-gray-900'
    }`}>
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-3 py-2 sm:py-3 overflow-hidden">
        <div className="w-full max-w-sm sm:max-w-md space-y-2 sm:space-y-3 flex flex-col items-center h-full justify-center">
          
          {/* Header - Centered */}
          <div className="text-center space-y-1 flex-shrink-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              NUMBPAIR
            </h1>
            {!gameStats.gameStarted && (
              <p className="text-sm sm:text-base text-white/70 leading-relaxed px-4 font-light">
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
            <div className="flex justify-center flex-shrink-0 w-full pt-8">
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
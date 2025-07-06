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
            <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-black tracking-wide">
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

      {/* Footer - Only show during gameplay */}
      <Footer gameStarted={gameStats.gameStarted} />
    </div>
  );
}

export default App;
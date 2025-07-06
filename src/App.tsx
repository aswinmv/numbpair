import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useGameLogic } from './hooks/useGameLogic';
import { GameGrid } from './components/GameGrid';
import { GameControls } from './components/GameControls';
import { ScoreBoard } from './components/ScoreBoard';
import { HowToPlay } from './components/HowToPlay';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { GameScreen } from './components/GameScreen';

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
    <div className="min-h-screen min-h-[100dvh] bg-gray-50 flex flex-col overflow-hidden">
      <Routes>
        <Route 
          path="/" 
          element={<HomeScreen onStartGame={startGame} />} 
        />
        <Route 
          path="/game" 
          element={
            <GameScreen
              grid={grid}
              selectedTiles={selectedTiles}
              gameStats={gameStats}
              animatingTiles={animatingTiles}
              selectTile={selectTile}
              resetGame={resetGame}
              addNewRow={addNewRow}
              showHint={handleHint}
              hasAvailableMatches={hasAvailableMatches}
              isTileSelected={isTileSelected}
              isTileHinted={isTileHinted}
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
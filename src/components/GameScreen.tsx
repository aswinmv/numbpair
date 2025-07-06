import React from 'react';
import { GameGrid } from './GameGrid';
import { GameControls } from './GameControls';
import { ScoreBoard } from './ScoreBoard';
import { HowToPlay } from './HowToPlay';
import { Footer } from './Footer';
import { Tile, SelectedTile, GameStats } from '../hooks/useGameLogic';

interface GameScreenProps {
  grid: Tile[][];
  selectedTiles: SelectedTile[];
  gameStats: GameStats;
  animatingTiles: Set<string>;
  selectTile: (tile: Tile, rowIndex: number, colIndex: number) => void;
  resetGame: () => void;
  addNewRow: () => void;
  showHint: () => void;
  hasAvailableMatches: boolean;
  isTileSelected: (tile: Tile) => boolean;
  isTileHinted: (tile: Tile) => boolean;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  grid,
  selectedTiles,
  gameStats,
  animatingTiles,
  selectTile,
  resetGame,
  addNewRow,
  showHint,
  hasAvailableMatches,
  isTileSelected,
  isTileHinted
}) => {
  return (
    <>
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

          {/* Game Controls - Centered */}
          <div className="flex justify-center flex-shrink-0 w-full">
            <GameControls
              gameStarted={gameStats.gameStarted}
              hasAvailableMatches={hasAvailableMatches}
              onStartGame={() => {}} // Not used in game screen
              onResetGame={resetGame}
              onAddRow={addNewRow}
              onGetHint={showHint}
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
      <Footer gameStarted={true} />
    </>
  );
};
import React from 'react';
import { Tile } from './Tile';
import { Tile as TileType } from '../hooks/useGameLogic';

interface GameGridProps {
  grid: TileType[][];
  animatingTiles: Set<string>;
  isTileSelected: (tile: TileType) => boolean;
  isTileHinted: (tile: TileType) => boolean;
  onTileClick: (tile: TileType, rowIndex: number, colIndex: number) => void;
}

export const GameGrid: React.FC<GameGridProps> = ({
  grid,
  animatingTiles,
  isTileSelected,
  isTileHinted,
  onTileClick
}) => {
  return (
    <div className="w-full flex justify-center px-1">
      <div 
        className="grid gap-2 sm:gap-2.5 p-4 sm:p-5 bg-black/20 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-sm"
        style={{
          gridTemplateColumns: 'repeat(9, minmax(0, 1fr))',
          width: '100%',
          maxWidth: '400px',
          aspectRatio: '9/13'
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile
              key={tile.id}
              tile={tile}
              rowIndex={rowIndex}
              colIndex={colIndex}
              isSelected={isTileSelected(tile)}
              isHinted={isTileHinted(tile)}
              isAnimating={animatingTiles.has(tile.id)}
              onClick={onTileClick}
            />
          ))
        )}
      </div>
    </div>
  );
};
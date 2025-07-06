import React from 'react';
import { Tile as TileType } from '../hooks/useGameLogic';

interface TileProps {
  tile: TileType;
  rowIndex: number;
  colIndex: number;
  isSelected: boolean;
  isHinted: boolean;
  isAnimating: boolean;
  onClick: (tile: TileType, rowIndex: number, colIndex: number) => void;
}

export const Tile: React.FC<TileProps> = ({
  tile,
  rowIndex,
  colIndex,
  isSelected,
  isHinted,
  isAnimating,
  onClick
}) => {
  const handleClick = () => {
    onClick(tile, rowIndex, colIndex);
  };

  const getBaseClasses = () => {
    return `
      aspect-square w-full min-w-0 text-base sm:text-lg md:text-xl font-bold rounded-xl
      transition-all duration-300 select-none flex items-center justify-center
      touch-manipulation
      ${isAnimating ? 'scale-0 opacity-0' : ''}
    `;
  };

  const getInteractiveClasses = () => {
    if (tile.isEmpty) {
      return 'bg-transparent cursor-default';
    }
    
    if (tile.isPlaceholder) {
      return 'bg-gray-800/30 text-gray-600 cursor-default border border-gray-700/50';
    }

    if (tile.isMatched) {
      return 'bg-gray-800/50 text-gray-500 cursor-default border border-gray-700/50 font-bold';
    }

    if (isHinted) {
      return `
        bg-white text-black scale-110 shadow-2xl
        border-2 border-white cursor-pointer
        animate-pulse ring-4 ring-white/30
        active:scale-105 active:shadow-xl
      `;
    }

    if (isSelected) {
      return `
        bg-white text-black scale-110 shadow-2xl
        border-2 border-white cursor-pointer
        active:scale-105 active:shadow-xl
      `;
    }

    return `
      bg-gray-800 text-white border border-gray-700
      hover:bg-gray-700 hover:border-gray-600 hover:scale-105 hover:shadow-xl
      active:scale-95 cursor-pointer shadow-lg
      active:bg-gray-600
    `;
  };

  const getTileContent = () => {
    if (tile.isEmpty) return '';
    if (tile.isPlaceholder) return '·';
    if (tile.isMatched) return '×';
    return tile.value;
  };

  return (
    <button
      onClick={handleClick}
      disabled={tile.isEmpty || tile.isPlaceholder || tile.isMatched || isAnimating}
      className={`${getBaseClasses()} ${getInteractiveClasses()}`}
      style={{
        minHeight: '36px',
        minWidth: '36px'
      }}
    >
      {getTileContent()}
    </button>
  );
};
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
      aspect-square w-full min-w-0 text-base sm:text-lg md:text-xl font-bold rounded-lg
      transition-all duration-200 select-none flex items-center justify-center
      touch-manipulation
      ${isAnimating ? 'scale-0 opacity-0' : ''}
    `;
  };

  const getInteractiveClasses = () => {
    if (tile.isEmpty) {
      return 'bg-transparent cursor-default';
    }
    
    if (tile.isPlaceholder) {
      return 'bg-gray-50 text-gray-300 cursor-default border border-gray-100';
    }

    if (tile.isMatched) {
      return 'bg-gray-100 text-gray-500 cursor-default border border-gray-200 font-bold';
    }

    if (isHinted) {
      return `
        bg-gradient-to-br from-blue-100 to-purple-100 text-gray-900 
        border-2 border-blue-300 cursor-pointer shadow-lg
        animate-pulse ring-2 ring-blue-200 ring-opacity-75
        active:scale-95 active:shadow-md
      `;
    }

    if (isSelected) {
      return `
        bg-gray-900 text-white scale-105 shadow-lg
        border-2 border-gray-900 cursor-pointer
        active:scale-100 active:shadow-xl
      `;
    }

    return `
      bg-white text-gray-900 border-2 border-gray-200
      hover:bg-gray-50 hover:border-gray-300 hover:scale-105
      active:scale-95 cursor-pointer shadow-sm
      active:bg-gray-100 active:shadow-md
    `;
  };

  const getTileContent = () => {
    if (tile.isEmpty) return '';
    if (tile.isPlaceholder) return '·';
    if (tile.isMatched) return 'N';
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
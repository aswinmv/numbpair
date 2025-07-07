import { useState, useCallback, useEffect } from 'react';

export interface Tile {
  value: number;
  id: string;
  row: number;
  col: number;
  isEmpty: boolean;
  isPlaceholder: boolean;
  isMatched: boolean; // New property for matched tiles
}

export interface SelectedTile {
  tile: Tile;
  index: number;
}

export interface GameStats {
  score: number;
  moves: number;
  gameStarted: boolean;
}

// Haptic feedback utility
const triggerHapticFeedback = () => {
  if ('vibrate' in navigator) {
    // Short vibration for wrong match
    navigator.vibrate(100);
  }
  
  // For iOS devices that support haptic feedback
  if ('hapticFeedback' in window) {
    try {
      (window as any).hapticFeedback.impact('medium');
    } catch (e) {
      // Silently fail if haptic feedback is not available
    }
  }
};

export const useGameLogic = () => {
  const [grid, setGrid] = useState<Tile[][]>([]);
  const [selectedTiles, setSelectedTiles] = useState<SelectedTile[]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    moves: 0,
    gameStarted: false
  });
  const [animatingTiles, setAnimatingTiles] = useState<Set<string>>(new Set());
  const [hintTiles, setHintTiles] = useState<Set<string>>(new Set());

  // Initialize grid with numbers 1-9 (13 rows x 9 columns)
  const initializeGrid = useCallback(() => {
    const newGrid: Tile[][] = [];
    for (let row = 0; row < 13; row++) {
      const gridRow: Tile[] = [];
      for (let col = 0; col < 9; col++) {
        gridRow.push({
          value: Math.floor(Math.random() * 9) + 1,
          id: `${row}-${col}`,
          row,
          col,
          isEmpty: false,
          isPlaceholder: false,
          isMatched: false
        });
      }
      newGrid.push(gridRow);
    }
    setGrid(newGrid);
  }, []);

  // Check if two tiles are adjacent or at row ends
  const areValidPositions = useCallback((tile1: Tile, tile2: Tile): boolean => {
    const rowDiff = Math.abs(tile1.row - tile2.row);
    const colDiff = Math.abs(tile1.col - tile2.col);
    
    // Adjacent tiles (including diagonal)
    if (rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0)) {
      return true;
    }
    
    // Same row, opposite ends
    if (tile1.row === tile2.row) {
      const row = grid[tile1.row];
      const minCol = Math.min(tile1.col, tile2.col);
      const maxCol = Math.max(tile1.col, tile2.col);
      
      // Check if all tiles between them are empty, placeholders, or matched
      for (let col = minCol + 1; col < maxCol; col++) {
        if (!row[col].isEmpty && !row[col].isPlaceholder && !row[col].isMatched) {
          return false;
        }
      }
      return true;
    }
    
    return false;
  }, [grid]);

  // Check if two tiles form a valid match
  const isValidMatch = useCallback((tile1: Tile, tile2: Tile): boolean => {
    if (tile1.isEmpty || tile2.isEmpty || tile1.isPlaceholder || tile2.isPlaceholder || tile1.isMatched || tile2.isMatched) return false;
    
    const sameValue = tile1.value === tile2.value;
    const sumToTen = tile1.value + tile2.value === 10;
    const validPositions = areValidPositions(tile1, tile2);
    
    return (sameValue || sumToTen) && validPositions;
  }, [areValidPositions]);

  // Clear hint when player takes action
  const clearHint = useCallback(() => {
    if (hintTiles.size > 0) {
      setHintTiles(new Set());
    }
  }, [hintTiles.size]);

  // Handle tile selection
  const selectTile = useCallback((tile: Tile, rowIndex: number, colIndex: number) => {
    if (tile.isEmpty || tile.isPlaceholder || tile.isMatched || animatingTiles.has(tile.id)) return;

    // Clear hint when player takes action
    clearHint();

    const tileWithIndex = { tile, index: rowIndex * 9 + colIndex };

    setSelectedTiles(prev => {
      if (prev.length === 0) {
        return [tileWithIndex];
      } else if (prev.length === 1) {
        const firstTile = prev[0];
        
        if (firstTile.tile.id === tile.id) {
          // Deselect if clicking the same tile
          return [];
        } else if (isValidMatch(firstTile.tile, tile)) {
          // Valid match found
          removeTiles(firstTile.tile, tile);
          setGameStats(current => ({
            ...current,
            score: current.score + (firstTile.tile.value + tile.value),
            moves: current.moves + 1
          }));
          return [];
        } else {
          // Invalid match - trigger haptic feedback
          triggerHapticFeedback();
          // Select new tile
          return [tileWithIndex];
        }
      }
      return prev;
    });
  }, [isValidMatch, animatingTiles, clearHint]);

  // Remove tiles with animation and replace with matched "N" tiles
  const removeTiles = useCallback((tile1: Tile, tile2: Tile) => {
    setAnimatingTiles(prev => new Set([...prev, tile1.id, tile2.id]));
    
    setTimeout(() => {
      setGrid(prev => {
        const newGrid = prev.map(row => [...row]);
        newGrid[tile1.row][tile1.col] = { 
          ...tile1, 
          isEmpty: false, 
          isPlaceholder: false, 
          isMatched: true,
          value: 0 
        };
        newGrid[tile2.row][tile2.col] = { 
          ...tile2, 
          isEmpty: false, 
          isPlaceholder: false, 
          isMatched: true,
          value: 0 
        };
        return newGrid;
      });
      
      setAnimatingTiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(tile1.id);
        newSet.delete(tile2.id);
        return newSet;
      });
    }, 300);
  }, []);

  // Check if grid is fully cleared (no active number tiles)
  const isGridFullyCleared = useCallback((): boolean => {
    return grid.every(row => 
      row.every(tile => tile.isEmpty || tile.isPlaceholder || tile.isMatched)
    );
  }, [grid]);

  // Check if any matches are available
  const hasAvailableMatches = useCallback((): boolean => {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const tile1 = grid[row][col];
        if (tile1.isEmpty || tile1.isPlaceholder || tile1.isMatched) continue;

        for (let row2 = 0; row2 < grid.length; row2++) {
          for (let col2 = 0; col2 < grid[row2].length; col2++) {
            const tile2 = grid[row2][col2];
            if (tile2.isEmpty || tile2.isPlaceholder || tile2.isMatched || tile1.id === tile2.id) continue;

            if (isValidMatch(tile1, tile2)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }, [grid, isValidMatch]);

  // Add new row(s) at the bottom
  const addNewRow = useCallback(() => {
    // Clear hint when adding new row
    clearHint();
    
    setGrid(prev => {
      const newGrid = [...prev];
      const isFullyCleared = isGridFullyCleared();
      const rowsToAdd = isFullyCleared ? 5 : 1;
      
      for (let i = 0; i < rowsToAdd; i++) {
        const newRow: Tile[] = [];
        const newRowIndex = newGrid.length;
        
        for (let col = 0; col < 9; col++) {
          newRow.push({
            value: Math.floor(Math.random() * 9) + 1,
            id: `${newRowIndex}-${col}`,
            row: newRowIndex,
            col,
            isEmpty: false,
            isPlaceholder: false,
            isMatched: false
          });
        }
        
        newGrid.push(newRow);
      }
      
      return newGrid;
    });
  }, [clearHint, isGridFullyCleared]);

  // Start new game
  const startGame = useCallback(() => {
    initializeGrid();
    setSelectedTiles([]);
    setGameStats({
      score: 0,
      moves: 0,
      gameStarted: true
    });
    setAnimatingTiles(new Set());
    setHintTiles(new Set());
  }, [initializeGrid]);

  // Reset game
  const resetGame = useCallback(() => {
    startGame();
  }, [startGame]);

  // Go back to home page
  const goToHome = useCallback(() => {
    setSelectedTiles([]);
    setGameStats({
      score: 0,
      moves: 0,
      gameStarted: false
    });
    setAnimatingTiles(new Set());
    setHintTiles(new Set());
    setGrid([]);
  }, []);
  // Get hint (find first available match)
  const getHint = useCallback((): [Tile, Tile] | null => {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const tile1 = grid[row][col];
        if (tile1.isEmpty || tile1.isPlaceholder || tile1.isMatched) continue;

        for (let row2 = 0; row2 < grid.length; row2++) {
          for (let col2 = 0; col2 < grid[row2].length; col2++) {
            const tile2 = grid[row2][col2];
            if (tile2.isEmpty || tile2.isPlaceholder || tile2.isMatched || tile1.id === tile2.id) continue;

            if (isValidMatch(tile1, tile2)) {
              return [tile1, tile2];
            }
          }
        }
      }
    }
    return null;
  }, [grid, isValidMatch]);

  // Show hint with visual highlighting
  const showHint = useCallback(() => {
    const hint = getHint();
    if (hint) {
      const [tile1, tile2] = hint;
      setHintTiles(new Set([tile1.id, tile2.id]));
      
      // Auto-clear hint after 3 seconds
      setTimeout(() => {
        setHintTiles(new Set());
      }, 3000);
      
      return hint;
    }
    return null;
  }, [getHint]);

  // Check if tile is selected
  const isTileSelected = useCallback((tile: Tile): boolean => {
    return selectedTiles.some(selected => selected.tile.id === tile.id);
  }, [selectedTiles]);

  // Check if tile is hinted
  const isTileHinted = useCallback((tile: Tile): boolean => {
    return hintTiles.has(tile.id);
  }, [hintTiles]);

  // Initialize grid on mount
  useEffect(() => {
    if (!gameStats.gameStarted) {
      initializeGrid();
    }
  }, [gameStats.gameStarted, initializeGrid]);

  return {
    grid,
    selectedTiles,
    gameStats,
    animatingTiles,
    hintTiles,
    selectTile,
    startGame,
    resetGame,
    goToHome,
    addNewRow,
    getHint,
    showHint,
    hasAvailableMatches: hasAvailableMatches(),
    isTileSelected,
    isTileHinted
  };
};
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GameState, Item, ThemeMode } from '@/types/game';
import { initialGameState } from '@/data/gameData';

type GameAction =
  | { type: 'START_GAME' }
  | { type: 'COMPLETE_GAME' }
  | { type: 'SET_THEME'; theme: ThemeMode }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'SET_MUSIC_VOLUME'; volume: number }
  | { type: 'SET_SFX_VOLUME'; volume: number }
  | { type: 'SET_CURRENT_LEVEL'; levelId: string }
  | { type: 'SET_CURRENT_ROOM'; roomId: string }
  | { type: 'ADD_ITEM_TO_INVENTORY'; item: Item }
  | { type: 'REMOVE_ITEM_FROM_INVENTORY'; itemId: string }
  | { type: 'UNLOCK_LEVEL'; levelId: string }
  | { type: 'COMPLETE_LEVEL'; levelId: string }
  | { type: 'COMPLETE_ROOM'; roomId: string }
  | { type: 'COMPLETE_HUNT'; huntId: string }
  | { type: 'SOLVE_PUZZLE'; levelId: string; roomId: string; puzzleId: string }
  | { type: 'ADVANCE_STORY' }
  | { type: 'RESET_GAME' };

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameStarted: true,
      };

    case 'COMPLETE_GAME':
      return {
        ...state,
        gameCompleted: true,
      };

    case 'SET_THEME':
      return {
        ...state,
        settings: {
          ...state.settings,
          theme: action.theme,
        },
      };

    case 'TOGGLE_SOUND':
      return {
        ...state,
        settings: {
          ...state.settings,
          soundEnabled: !state.settings.soundEnabled,
        },
      };

    case 'SET_MUSIC_VOLUME':
      return {
        ...state,
        settings: {
          ...state.settings,
          musicVolume: action.volume,
        },
      };

    case 'SET_SFX_VOLUME':
      return {
        ...state,
        settings: {
          ...state.settings,
          sfxVolume: action.volume,
        },
      };

    case 'SET_CURRENT_LEVEL': {
      const levelExists = state.levels.some(level => level.id === action.levelId);
      if (!levelExists) return state;

      return {
        ...state,
        player: {
          ...state.player,
          currentLevelId: action.levelId,
          currentRoomId: state.levels.find(level => level.id === action.levelId)?.rooms[0].id || null,
        },
      };
    }

    case 'SET_CURRENT_ROOM': {
      const roomExists = state.levels.some(level => 
        level.rooms.some(room => room.id === action.roomId)
      );
      if (!roomExists) return state;

      return {
        ...state,
        player: {
          ...state.player,
          currentRoomId: action.roomId,
        },
      };
    }

    case 'ADD_ITEM_TO_INVENTORY':
      return {
        ...state,
        player: {
          ...state.player,
          inventory: [...state.player.inventory, action.item],
        },
      };

    case 'REMOVE_ITEM_FROM_INVENTORY':
      return {
        ...state,
        player: {
          ...state.player,
          inventory: state.player.inventory.filter(item => item.id !== action.itemId),
        },
      };

    case 'UNLOCK_LEVEL':
      return {
        ...state,
        player: {
          ...state.player,
          unlockedLevels: [...state.player.unlockedLevels, action.levelId],
        },
        levels: state.levels.map(level =>
          level.id === action.levelId ? { ...level, isUnlocked: true } : level
        ),
      };

    case 'COMPLETE_LEVEL':
      return {
        ...state,
        player: {
          ...state.player,
          completedLevels: [...state.player.completedLevels, action.levelId],
          gameProgress: Math.min(100, state.player.gameProgress + (100 / state.levels.length)),
        },
        levels: state.levels.map(level =>
          level.id === action.levelId ? { ...level, isCompleted: true } : level
        ),
      };

    case 'COMPLETE_ROOM':
      return {
        ...state,
        player: {
          ...state.player,
          completedRooms: [...state.player.completedRooms, action.roomId],
        },
        levels: state.levels.map(level => ({
          ...level,
          rooms: level.rooms.map(room =>
            room.id === action.roomId ? { ...room, isCompleted: true } : room
          ),
        })),
      };

    case 'COMPLETE_HUNT':
      return {
        ...state,
        player: {
          ...state.player,
          completedHunts: [...state.player.completedHunts, action.huntId],
        },
      };

    case 'SOLVE_PUZZLE': {
      return {
        ...state,
        levels: state.levels.map(level => 
          level.id === action.levelId ? {
            ...level,
            rooms: level.rooms.map(room => 
              room.id === action.roomId ? {
                ...room,
                puzzles: room.puzzles.map(puzzle => 
                  puzzle.id === action.puzzleId ? {
                    ...puzzle,
                    solved: true,
                  } : puzzle
                ),
              } : room
            ),
          } : level
        ),
      };
    }

    case 'ADVANCE_STORY':
      return {
        ...state,
        storyProgress: state.storyProgress + 1,
      };

    case 'RESET_GAME':
      return initialGameState;

    default:
      return state;
  }
};

type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  startGame: () => void;
  completeGame: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleSound: () => void;
  setMusicVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  setCurrentLevel: (levelId: string) => void;
  setCurrentRoom: (roomId: string) => void;
  addItemToInventory: (item: Item) => void;
  removeItemFromInventory: (itemId: string) => void;
  unlockLevel: (levelId: string) => void;
  completeLevel: (levelId: string) => void;
  completeRoom: (roomId: string) => void;
  completeHunt: (huntId: string) => void;
  solvePuzzle: (levelId: string, roomId: string, puzzleId: string) => void;
  advanceStory: () => void;
  resetGame: () => void;
  canUseItem: (itemId: string) => boolean;
  hasCompletedAllPuzzlesInRoom: (roomId: string) => boolean;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  // Apply theme on mount and when it changes
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(state.settings.theme);
  }, [state.settings.theme]);
  
  // Save game state to localStorage
  useEffect(() => {
    if (state.gameStarted) {
      localStorage.setItem('escapeGameState', JSON.stringify(state));
    }
  }, [state]);
  
  const startGame = () => dispatch({ type: 'START_GAME' });
  const completeGame = () => dispatch({ type: 'COMPLETE_GAME' });
  const setTheme = (theme: ThemeMode) => dispatch({ type: 'SET_THEME', theme });
  const toggleSound = () => dispatch({ type: 'TOGGLE_SOUND' });
  const setMusicVolume = (volume: number) => dispatch({ type: 'SET_MUSIC_VOLUME', volume });
  const setSfxVolume = (volume: number) => dispatch({ type: 'SET_SFX_VOLUME', volume });
  const setCurrentLevel = (levelId: string) => dispatch({ type: 'SET_CURRENT_LEVEL', levelId });
  const setCurrentRoom = (roomId: string) => dispatch({ type: 'SET_CURRENT_ROOM', roomId });
  const addItemToInventory = (item: Item) => dispatch({ type: 'ADD_ITEM_TO_INVENTORY', item });
  const removeItemFromInventory = (itemId: string) => dispatch({ type: 'REMOVE_ITEM_FROM_INVENTORY', itemId });
  const unlockLevel = (levelId: string) => dispatch({ type: 'UNLOCK_LEVEL', levelId });
  const completeLevel = (levelId: string) => dispatch({ type: 'COMPLETE_LEVEL', levelId });
  const completeRoom = (roomId: string) => dispatch({ type: 'COMPLETE_ROOM', roomId });
  const completeHunt = (huntId: string) => dispatch({ type: 'COMPLETE_HUNT', huntId });
  const solvePuzzle = (levelId: string, roomId: string, puzzleId: string) => 
    dispatch({ type: 'SOLVE_PUZZLE', levelId, roomId, puzzleId });
  const advanceStory = () => dispatch({ type: 'ADVANCE_STORY' });
  const resetGame = () => dispatch({ type: 'RESET_GAME' });
  
  const canUseItem = (itemId: string): boolean => {
    const item = state.player.inventory.find(item => item.id === itemId);
    if (!item?.isUsable) return false;
    
    const currentLevel = state.levels.find(level => level.id === state.player.currentLevelId);
    const currentRoom = currentLevel?.rooms.find(room => room.id === state.player.currentRoomId);
    
    // Check if the item is a key and if it can unlock the current room
    if (item.isKey && currentRoom?.requiredKeyId === itemId) {
      return true;
    }
    
    // Check if the item is required for any unsolved puzzle in the current room
    return currentRoom?.puzzles.some(
      puzzle => !puzzle.solved && puzzle.requiredItems?.includes(itemId)
    ) || false;
  };
  
  const hasCompletedAllPuzzlesInRoom = (roomId: string): boolean => {
    const room = state.levels
      .flatMap(level => level.rooms)
      .find(r => r.id === roomId);
      
    return room ? room.puzzles.every(puzzle => puzzle.solved) : false;
  };
  
  const value = {
    state,
    dispatch,
    startGame,
    completeGame,
    setTheme,
    toggleSound,
    setMusicVolume,
    setSfxVolume,
    setCurrentLevel,
    setCurrentRoom,
    addItemToInventory,
    removeItemFromInventory,
    unlockLevel,
    completeLevel,
    completeRoom,
    completeHunt,
    solvePuzzle,
    advanceStory,
    resetGame,
    canUseItem,
    hasCompletedAllPuzzlesInRoom,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
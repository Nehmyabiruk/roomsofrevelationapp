export type ThemeMode = 'dark' | 'light';

export interface GameSettings {
  theme: ThemeMode;
  soundEnabled: boolean;
  musicVolume: number;
  sfxVolume: number;
}

export type LevelDifficulty = 'medium' | 'hard';

export interface Item {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isKey?: boolean;
  isUsable?: boolean;
  canCombine?: boolean;
  combinesWith?: string[];
}

export interface Puzzle {
  id: string;
  type: 'combination' | 'pattern' | 'riddle' | 'hidden-object' | 'sequence';
  description: string;
  hint: string;
  solved: boolean;
  requiredItems?: string[];
  solution?: string | string[];
  attempts?: number;
}

export interface Hunt {
  id: string;
  description: string;
  completed: boolean;
  reward?: Item;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  backgroundImage: string;
  puzzles: Puzzle[];
  items: Item[];
  hunts: Hunt[];
  isLocked: boolean;
  requiredKeyId?: string;
  completionText?: string;
  isCompleted: boolean;
}

export interface Level {
  id: string;
  name: string;
  description: string;
  storyIntro: string;
  storyOutro?: string;
  difficulty: LevelDifficulty;
  rooms: Room[];
  isUnlocked: boolean;
  isCompleted: boolean;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dialogues: Record<string, string[]>;
}

export interface PlayerState {
  currentLevelId: string | null;
  currentRoomId: string | null;
  inventory: Item[];
  unlockedLevels: string[];
  completedLevels: string[];
  completedRooms: string[];
  completedHunts: string[];
  gameProgress: number;
}

export interface GameState {
  settings: GameSettings;
  player: PlayerState;
  levels: Level[];
  characters: Character[];
  storyProgress: number;
  gameStarted: boolean;
  gameCompleted: boolean;
}
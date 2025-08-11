import { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Book, Home, Info, Map, Package, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Game components
import GameLayout from '@/components/game/GameLayout';
import RoomView from '@/components/game/RoomView';
import Inventory from '@/components/game/Inventory';
import LevelSelect from '@/components/game/LevelSelect';
import StoryNarration from '@/components/game/StoryNarration';
import Instructions from '@/components/game/Instructions';
import SettingsPanel from '@/components/game/SettingsPanel';

export default function Game() {
  const { state, initializeGame } = useGame();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('room');
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Initialize the game data on component mount
    const initGame = async () => {
      try {
        await initializeGame();
      } catch (error) {
        console.error('Failed to initialize game:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initGame();
    // Check if this is the first time loading the game to show instructions
    const firstTimePlay = localStorage.getItem('escape-legacy-first-play') === null;
    if (firstTimePlay) {
      setShowInstructions(true);
      localStorage.setItem('escape-legacy-first-play', 'false');
    }
  }, [initializeGame]);
  
  const { player, levels } = state;
  const currentLevel = levels.find(level => level.id === player.currentLevelId);
  const currentRoom = currentLevel?.rooms.find(room => room.id === player.currentRoomId);
  
  // Calculate game progress
  const totalRooms = levels.reduce((acc, level) => acc + level.rooms.length, 0);
  const completedRooms = player.completedRooms.length;
  const gameProgress = totalRooms > 0 ? Math.round((completedRooms / totalRooms) * 100) : 0;
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
        <div className="w-16 h-16 border-t-2 border-amber-500 border-solid rounded-full animate-spin mb-4"></div>
        <p className="text-amber-500">Loading the adventure...</p>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen flex flex-col ${state.settings.theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'}`}>
      {/* Header */}
      <header className={`p-3 ${state.settings.theme === 'dark' ? 'bg-gray-900/80' : 'bg-white shadow-sm'}`}>
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className={state.settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
            >
              <Home className="h-4 w-4 mr-1" />
              Exit Game
            </Button>
            
            <span className={`text-sm ${state.settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Level: {currentLevel?.name}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowInstructions(true)}
              className={state.settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
            >
              <Info className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowSettings(true)}
              className={state.settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
            >
              <SettingsIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Progress bar */}
      <div className="px-3 py-1 bg-gray-900">
        <div className="container">
          <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
            <span>Game Progress</span>
            <span>{gameProgress}%</span>
          </div>
          <Progress value={gameProgress} className="h-1" />
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-grow">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="h-full flex flex-col"
        >
          <TabsContent value="room" className="flex-grow m-0 p-0">
            {currentRoom ? (
              <RoomView 
                room={currentRoom}
                levelId={currentLevel?.id || ''}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">No room selected. Choose a level to begin.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="inventory" className="flex-grow m-0 p-0">
            <Inventory />
          </TabsContent>
          
          <TabsContent value="levels" className="flex-grow m-0 p-0">
            <LevelSelect />
          </TabsContent>
          
          <TabsContent value="story" className="flex-grow m-0 p-0">
            <StoryNarration />
          </TabsContent>
          
          <TabsList 
            className="flex border-t border-gray-800 bg-gray-950"
          >
            <TabsTrigger 
              value="room" 
              className="flex-1 py-3 rounded-none data-[state=active]:bg-gray-900"
            >
              <Map className="h-4 w-4 mr-1" /> Room
            </TabsTrigger>
            <TabsTrigger 
              value="inventory"
              className="flex-1 py-3 rounded-none data-[state=active]:bg-gray-900"
            >
              <Package className="h-4 w-4 mr-1" /> Items
            </TabsTrigger>
            <TabsTrigger 
              value="levels"
              className="flex-1 py-3 rounded-none data-[state=active]:bg-gray-900"
            >
              <GameLayout className="h-4 w-4 mr-1" /> Levels
            </TabsTrigger>
            <TabsTrigger 
              value="story"
              className="flex-1 py-3 rounded-none data-[state=active]:bg-gray-900"
            >
              <Book className="h-4 w-4 mr-1" /> Story
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </main>
      
      {/* Instructions Dialog */}
      {showInstructions && (
        <Instructions onClose={() => setShowInstructions(false)} />
      )}
      
      {/* Settings Dialog */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}
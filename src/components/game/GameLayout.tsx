import { useGame } from '@/contexts/GameContext';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Moon, Sun, Volume2, VolumeX, Settings, Book, Menu, X, HelpCircle } from 'lucide-react';
import RoomView from './RoomView';
import Inventory from './Inventory';
import StoryNarration from './StoryNarration';
import LevelSelect from './LevelSelect';
import SettingsPanel from './SettingsPanel';
import Instructions from './Instructions';

export default function GameLayout() {
  const { state, setTheme, toggleSound, startGame, resetGame } = useGame();
  const [activeTab, setActiveTab] = useState<string>('room');
  const [showMainMenu, setShowMainMenu] = useState(!state.gameStarted);
  const [showSettings, setShowSettings] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showGameMenu, setShowGameMenu] = useState(false);
  
  const currentLevel = state.levels.find(level => level.id === state.player.currentLevelId);
  const currentRoom = currentLevel?.rooms.find(room => room.id === state.player.currentRoomId);

  useEffect(() => {
    // Load saved game from localStorage if exists
    const savedGame = localStorage.getItem('escapeGameState');
    if (savedGame && !state.gameStarted) {
      // Game state is loaded in the reducer via the load action
      startGame();
    }
  }, []);

  const handleStartGame = () => {
    startGame();
    setShowMainMenu(false);
  };
  
  const handleContinueGame = () => {
    setShowGameMenu(false);
  };
  
  const handleMainMenu = () => {
    setShowGameMenu(false);
    setShowMainMenu(true);
  };
  
  const handleNewGame = () => {
    resetGame();
    startGame();
    setShowMainMenu(false);
    setShowGameMenu(false);
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Main Menu */}
      <Dialog open={showMainMenu} onOpenChange={setShowMainMenu}>
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-4xl font-bold text-center text-amber-500">
              Escape Legacy:<br />
              <span className="text-3xl text-purple-400">Dark Passages</span>
            </DialogTitle>
            <DialogDescription className="text-center text-gray-300">
              A story-driven escape room adventure
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Button 
              variant="default" 
              className="text-lg h-14 bg-amber-600 hover:bg-amber-700"
              onClick={handleStartGame}
            >
              New Game
            </Button>
            {localStorage.getItem('escapeGameState') && (
              <Button 
                variant="outline" 
                className="text-lg h-14 border-amber-600 text-amber-500 hover:bg-amber-900/20"
                onClick={() => {
                  startGame();
                  setShowMainMenu(false);
                }}
              >
                Continue
              </Button>
            )}
            <Button 
              variant="outline" 
              className="text-lg h-14 border-purple-600 text-purple-400 hover:bg-purple-900/20"
              onClick={() => {
                setShowInstructions(true);
                setShowMainMenu(false);
              }}
            >
              How to Play
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* In-game Menu */}
      <Dialog open={showGameMenu} onOpenChange={setShowGameMenu}>
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-amber-500">
              Game Menu
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Button 
              variant="default" 
              className="text-lg h-12 bg-amber-600 hover:bg-amber-700"
              onClick={handleContinueGame}
            >
              Continue Playing
            </Button>
            <Button 
              variant="outline" 
              className="text-lg h-12 border-purple-600 text-purple-400 hover:bg-purple-900/20"
              onClick={() => {
                setShowSettings(true);
                setShowGameMenu(false);
              }}
            >
              Settings
            </Button>
            <Button 
              variant="outline" 
              className="text-lg h-12 border-purple-600 text-purple-400 hover:bg-purple-900/20"
              onClick={() => {
                setShowInstructions(true);
                setShowGameMenu(false);
              }}
            >
              How to Play
            </Button>
            <Button 
              variant="outline" 
              className="text-lg h-12 border-red-600 text-red-400 hover:bg-red-900/20"
              onClick={handleMainMenu}
            >
              Exit to Main Menu
            </Button>
            <Button 
              variant="destructive" 
              className="text-lg h-12"
              onClick={handleNewGame}
            >
              Start New Game
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Instructions Dialog */}
      {showInstructions && <Instructions onClose={() => setShowInstructions(false)} />}
      
      {/* Settings Panel Dialog */}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}

      {/* Game Interface */}
      {state.gameStarted && !showMainMenu && (
        <>
          {/* Header */}
          <div className="flex justify-between items-center p-2 bg-gray-900 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8 border-gray-700"
                onClick={() => setShowGameMenu(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              <h1 className="font-semibold text-sm md:text-base truncate">
                {currentLevel?.name} - {currentRoom?.name || 'Select Room'}
              </h1>
            </div>
            
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8 border-gray-700"
                onClick={toggleSound}
              >
                {state.settings.soundEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8 border-gray-700"
                onClick={() => setTheme(state.settings.theme === 'dark' ? 'light' : 'dark')}
              >
                {state.settings.theme === 'dark' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8 border-gray-700"
                onClick={() => setShowInstructions(true)}
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-800 h-1">
            <div 
              className="bg-gradient-to-r from-purple-500 to-amber-500 h-full transition-all duration-500"
              style={{ width: `${state.player.gameProgress}%` }}
            />
          </div>

          {/* Main Content */}
          <div className="flex-grow overflow-hidden relative">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsContent value="room" className="flex-grow m-0 p-0 overflow-hidden">
                <RoomView />
              </TabsContent>
              
              <TabsContent value="inventory" className="flex-grow m-0 p-0 overflow-y-auto">
                <Inventory />
              </TabsContent>
              
              <TabsContent value="story" className="flex-grow m-0 p-0 overflow-y-auto">
                <StoryNarration />
              </TabsContent>
              
              <TabsContent value="levels" className="flex-grow m-0 p-0 overflow-y-auto">
                <LevelSelect />
              </TabsContent>

              {/* Footer Navigation */}
              <div className="bg-gray-900 border-t border-gray-800">
                <TabsList className="w-full grid grid-cols-4 bg-transparent">
                  <TabsTrigger 
                    value="room" 
                    className="data-[state=active]:bg-gray-800 data-[state=active]:text-amber-500"
                  >
                    Room
                  </TabsTrigger>
                  <TabsTrigger 
                    value="inventory"
                    className="data-[state=active]:bg-gray-800 data-[state=active]:text-amber-500"
                  >
                    Inventory
                  </TabsTrigger>
                  <TabsTrigger 
                    value="story"
                    className="data-[state=active]:bg-gray-800 data-[state=active]:text-amber-500"
                  >
                    Story
                  </TabsTrigger>
                  <TabsTrigger 
                    value="levels"
                    className="data-[state=active]:bg-gray-800 data-[state=active]:text-amber-500"
                  >
                    Levels
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
}
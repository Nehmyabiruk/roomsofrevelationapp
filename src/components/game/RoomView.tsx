import { useGame } from '@/contexts/GameContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Key, Search, Puzzle, Check } from 'lucide-react';
import ItemInteraction from './ItemInteraction';
import PuzzleSolver from './PuzzleSolver';
import HuntChallenge from './HuntChallenge';
import RoomTransition from './RoomTransition';

export default function RoomView() {
  const { state, setCurrentRoom, addItemToInventory, completeRoom } = useGame();
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showPuzzleDialog, setShowPuzzleDialog] = useState(false);
  const [selectedPuzzle, setSelectedPuzzle] = useState<any>(null);
  const [showHuntDialog, setShowHuntDialog] = useState(false);
  const [selectedHunt, setSelectedHunt] = useState<any>(null);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  
  const currentLevel = state.levels.find(level => level.id === state.player.currentLevelId);
  const currentRoom = currentLevel?.rooms.find(room => room.id === state.player.currentRoomId);
  const availableRooms = currentLevel?.rooms || [];

  // If no room is selected, show room selection
  if (!currentRoom) {
    return (
      <div className="h-full flex flex-col p-4">
        <h2 className="text-xl font-bold mb-4">Select a Room</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {availableRooms.map(room => (
            <Card 
              key={room.id}
              className={`cursor-pointer hover:border-amber-500 transition-colors relative ${
                room.isLocked ? 'opacity-80 border-red-700' : 'border-gray-700'
              }`}
              onClick={() => {
                if (!room.isLocked) {
                  setCurrentRoom(room.id);
                }
              }}
            >
              <div 
                className="h-40 bg-cover bg-center rounded-t-lg"
                style={{ backgroundImage: `url(${room.backgroundImage})` }}
              >
                {room.isLocked && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-t-lg">
                    <Lock className="h-12 w-12 text-red-500" />
                  </div>
                )}
                {room.isCompleted && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-600">
                      <Check className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-lg">{room.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{room.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowItemDialog(true);
  };

  const handlePuzzleClick = (puzzle) => {
    setSelectedPuzzle(puzzle);
    setShowPuzzleDialog(true);
  };

  const handleHuntClick = (hunt) => {
    setSelectedHunt(hunt);
    setShowHuntDialog(true);
  };

  const handleCollectItem = (item) => {
    addItemToInventory(item);
    setShowItemDialog(false);
  };

  const handleRoomCompletion = () => {
    completeRoom(currentRoom.id);
    setShowCompletionDialog(false);
    // Check if we need to unlock the next room or level here
  };
  
  const isRoomCompleted = currentRoom.puzzles.every(puzzle => puzzle.solved);
  
  // Check if room is newly completed and show completion dialog
  if (isRoomCompleted && !currentRoom.isCompleted && !showCompletionDialog && currentRoom.completionText) {
    setShowCompletionDialog(true);
  }

  return (
    <div className="h-full flex flex-col relative">
      {/* Room Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-30"
        style={{ backgroundImage: `url(${currentRoom.backgroundImage})` }}
      />
      
      {/* Room Content */}
      <div className="relative z-10 flex flex-col h-full p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-amber-500">{currentRoom.name}</h2>
            <p className="text-sm text-gray-300">{currentRoom.description}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-700"
            onClick={() => setCurrentRoom('')}
          >
            Change Room
          </Button>
        </div>
        
        {/* Interactive Elements */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
          {/* Items */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Search className="h-4 w-4 mr-1" /> 
              Items ({currentRoom.items.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentRoom.items.map(item => {
                // Check if this item is already in inventory
                const collected = state.player.inventory.some(i => i.id === item.id);
                
                return (
                  <Card 
                    key={item.id}
                    className={`cursor-pointer hover:border-amber-500 transition-colors ${
                      collected ? 'opacity-50' : ''
                    }`}
                    onClick={() => !collected && handleItemClick(item)}
                  >
                    <div className="p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.name}</h4>
                        {item.isKey && <Key className="h-4 w-4 text-amber-500" />}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
          
          {/* Puzzles */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Puzzle className="h-4 w-4 mr-1" /> 
              Puzzles ({currentRoom.puzzles.length})
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {currentRoom.puzzles.map(puzzle => (
                <Card 
                  key={puzzle.id}
                  className={`cursor-pointer hover:border-amber-500 transition-colors ${
                    puzzle.solved ? 'border-green-700 bg-green-900/20' : ''
                  }`}
                  onClick={() => !puzzle.solved && handlePuzzleClick(puzzle)}
                >
                  <div className="p-3">
                    <div className="flex justify-between">
                      <h4 className="font-medium">
                        {puzzle.solved ? (
                          <span className="flex items-center">
                            <Check className="h-4 w-4 mr-1 text-green-500" />
                            Solved
                          </span>
                        ) : (
                          `${puzzle.type.charAt(0).toUpperCase() + puzzle.type.slice(1)} Puzzle`
                        )}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{puzzle.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Hunts */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Search className="h-4 w-4 mr-1" /> 
              Hunts ({currentRoom.hunts.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentRoom.hunts.map(hunt => {
                const completed = state.player.completedHunts.includes(hunt.id);
                
                return (
                  <Card 
                    key={hunt.id}
                    className={`cursor-pointer hover:border-amber-500 transition-colors ${
                      completed ? 'border-green-700 bg-green-900/20' : ''
                    }`}
                    onClick={() => !completed && handleHuntClick(hunt)}
                  >
                    <div className="p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">
                          {completed ? (
                            <span className="flex items-center">
                              <Check className="h-4 w-4 mr-1 text-green-500" />
                              Hunt Completed
                            </span>
                          ) : (
                            'Hidden Item Hunt'
                          )}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{hunt.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Item Dialog */}
      {showItemDialog && selectedItem && (
        <ItemInteraction 
          item={selectedItem}
          onClose={() => setShowItemDialog(false)}
          onCollect={handleCollectItem}
        />
      )}

      {/* Puzzle Dialog */}
      {showPuzzleDialog && selectedPuzzle && (
        <PuzzleSolver 
          puzzle={selectedPuzzle}
          levelId={currentLevel?.id || ''}
          roomId={currentRoom.id}
          onClose={() => setShowPuzzleDialog(false)}
        />
      )}

      {/* Hunt Dialog */}
      {showHuntDialog && selectedHunt && (
        <HuntChallenge
          hunt={selectedHunt}
          onClose={() => setShowHuntDialog(false)}
        />
      )}

      {/* Room Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl text-amber-500">Room Completed!</DialogTitle>
            <DialogDescription className="text-gray-300">
              {currentRoom.completionText}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleRoomCompletion} className="bg-amber-600 hover:bg-amber-700">
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Room Transition Animation */}
      <RoomTransition />
    </div>
  );
}
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, Lock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useState } from 'react';

export default function LevelSelect() {
  const { state, setCurrentLevel } = useGame();
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const [showLevelDetails, setShowLevelDetails] = useState(false);
  
  const handleLevelSelect = (level) => {
    if (!level.isUnlocked) return;
    
    setSelectedLevel(level);
    setShowLevelDetails(true);
  };
  
  const handleStartLevel = () => {
    if (selectedLevel) {
      setCurrentLevel(selectedLevel.id);
    }
    setShowLevelDetails(false);
  };
  
  const getLevelProgress = (levelId: string) => {
    const level = state.levels.find(l => l.id === levelId);
    if (!level) return 0;
    
    const totalRooms = level.rooms.length;
    const completedRooms = level.rooms.filter(room => 
      state.player.completedRooms.includes(room.id)
    ).length;
    
    return totalRooms > 0 ? Math.round((completedRooms / totalRooms) * 100) : 0;
  };
  
  return (
    <div className="h-full flex flex-col p-4 bg-gray-950/50">
      <h2 className="text-xl font-bold text-amber-500 mb-4">Levels</h2>
      
      <div className="grid grid-cols-1 gap-4 overflow-y-auto flex-grow">
        {state.levels.map(level => {
          const progress = getLevelProgress(level.id);
          const isCurrentLevel = state.player.currentLevelId === level.id;
          
          return (
            <Card 
              key={level.id}
              className={`cursor-pointer hover:border-amber-500 transition-colors ${
                level.isUnlocked 
                  ? isCurrentLevel 
                    ? 'border-amber-500' 
                    : 'border-gray-700' 
                  : 'border-gray-800 opacity-80'
              }`}
              onClick={() => handleLevelSelect(level)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {level.name}
                      {level.isCompleted && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-400">
                      {level.description}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={level.difficulty === 'hard' ? 'destructive' : 'outline'}
                    className={level.difficulty === 'hard' ? '' : 'border-amber-500 text-amber-500'}
                  >
                    <Star className="h-3 w-3 mr-1" />
                    {level.difficulty === 'hard' ? 'Hard' : 'Medium'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-1" />
              </CardContent>
              <CardFooter className="pt-0">
                {!level.isUnlocked ? (
                  <div className="flex items-center text-sm text-gray-500">
                    <Lock className="h-3 w-3 mr-1" /> Locked
                  </div>
                ) : isCurrentLevel ? (
                  <div className="text-sm text-amber-500">Current Level</div>
                ) : level.isCompleted ? (
                  <div className="text-sm text-green-500">Completed</div>
                ) : progress > 0 ? (
                  <div className="text-sm text-blue-400">In Progress</div>
                ) : (
                  <div className="text-sm text-gray-400">Not Started</div>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {/* Level Details Dialog */}
      <Dialog open={showLevelDetails} onOpenChange={setShowLevelDetails}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700">
          {selectedLevel && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl text-amber-500">
                  {selectedLevel.name}
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  {selectedLevel.description}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="mb-4 bg-gray-800 p-3 rounded-md border border-gray-700">
                  <p className="text-sm text-gray-300 italic">
                    "{selectedLevel.storyIntro}"
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-800 p-2 rounded-md">
                    <p className="text-xs text-gray-400">Difficulty</p>
                    <p className="font-medium">
                      {selectedLevel.difficulty === 'hard' 
                        ? 'Hard' 
                        : 'Medium'}
                    </p>
                  </div>
                  <div className="bg-gray-800 p-2 rounded-md">
                    <p className="text-xs text-gray-400">Rooms</p>
                    <p className="font-medium">{selectedLevel.rooms.length}</p>
                  </div>
                  <div className="bg-gray-800 p-2 rounded-md">
                    <p className="text-xs text-gray-400">Status</p>
                    <p className="font-medium">
                      {selectedLevel.isCompleted 
                        ? 'Completed' 
                        : state.player.currentLevelId === selectedLevel.id
                          ? 'Current'
                          : 'Available'}
                    </p>
                  </div>
                  <div className="bg-gray-800 p-2 rounded-md">
                    <p className="text-xs text-gray-400">Progress</p>
                    <p className="font-medium">
                      {getLevelProgress(selectedLevel.id)}%
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  onClick={handleStartLevel}
                >
                  {state.player.currentLevelId === selectedLevel.id
                    ? 'Continue Level'
                    : selectedLevel.isCompleted
                      ? 'Replay Level'
                      : 'Start Level'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
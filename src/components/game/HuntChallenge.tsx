import { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Search, CheckCircle2, Lightbulb, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Hunt } from '@/types/game';

interface HuntChallengeProps {
  hunt: Hunt;
  levelId: string;
  roomId: string;
  onClose: () => void;
}

export default function HuntChallenge({ hunt, levelId, roomId, onClose }: HuntChallengeProps) {
  const { state, completeHunt } = useGame();
  const [showHint, setShowHint] = useState(false);
  const [foundObjects, setFoundObjects] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(hunt.timeLimit || 0);
  const [message, setMessage] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const totalObjects = hunt.hiddenObjects?.length || 0;
  const progress = totalObjects > 0 ? Math.round((foundObjects.length / totalObjects) * 100) : 0;
  
  // Setup timer if hunt has time limit
  useEffect(() => {
    if (hunt.timeLimit && timeRemaining > 0 && !isCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [hunt.timeLimit, timeRemaining, isCompleted]);
  
  // Check if time ran out
  useEffect(() => {
    if (hunt.timeLimit && timeRemaining <= 0 && !isCompleted) {
      setMessage("Time's up! Hunt failed.");
      setTimeout(onClose, 2000);
    }
  }, [timeRemaining, hunt.timeLimit, isCompleted, onClose]);
  
  const handleObjectFound = (objectId: string) => {
    if (foundObjects.includes(objectId) || isCompleted) return;
    
    setFoundObjects(prev => [...prev, objectId]);
    setMessage(`Found: ${hunt.hiddenObjects?.find(obj => obj.id === objectId)?.name}`);
    
    setTimeout(() => setMessage(null), 1500);
    
    // Check if all objects are found
    if (foundObjects.length + 1 >= totalObjects) {
      setIsCompleted(true);
      setMessage("Hunt completed successfully!");
      
      setTimeout(() => {
        completeHunt(levelId, roomId, hunt.id);
        onClose();
      }, 2000);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl text-amber-500 flex items-center gap-2">
            <Search className="h-5 w-5" />
            {hunt.name}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {hunt.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {/* Progress indicator */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
              <span>Progress</span>
              <span>{foundObjects.length} / {totalObjects} items</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Timer (if applicable) */}
          {hunt.timeLimit && (
            <div className="mb-4 flex items-center justify-center">
              <div className={`text-lg font-mono font-bold ${
                timeRemaining < 10 ? 'text-red-500 animate-pulse' : 'text-amber-500'
              }`}>
                {formatTime(timeRemaining)}
              </div>
            </div>
          )}
          
          {/* Message display */}
          {message && (
            <Alert className="mb-4 bg-amber-900/20 border-amber-900">
              <AlertDescription>
                {message}
              </AlertDescription>
            </Alert>
          )}
          
          {/* Hunt area (in a real implementation, this would be an interactive image) */}
          <div className="relative w-full h-64 border border-gray-700 rounded-md bg-gray-800 overflow-hidden mb-4">
            {/* This is a placeholder for the actual hunt area */}
            {/* In a real implementation, you would map hidden object positions to coordinates */}
            {hunt.hiddenObjects?.map((object, index) => (
              <button
                key={object.id}
                className={`absolute p-1 rounded-full ${
                  foundObjects.includes(object.id) 
                    ? 'bg-green-500/20 border border-green-500' 
                    : 'bg-transparent hover:bg-gray-700/30 cursor-pointer'
                }`}
                style={{
                  // These would be calculated based on actual image and object positions
                  left: `${10 + (index * 20)}%`,
                  top: `${20 + (index * 15)}%`,
                  width: '40px',
                  height: '40px',
                }}
                onClick={() => handleObjectFound(object.id)}
                disabled={foundObjects.includes(object.id) || isCompleted}
              >
                {foundObjects.includes(object.id) && (
                  <CheckCircle2 className="h-full w-full text-green-500" />
                )}
              </button>
            ))}
            
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <p>
                {isCompleted ? (
                  <span className="flex items-center gap-1 text-green-500">
                    <CheckCircle2 className="h-5 w-5" /> Hunt Completed!
                  </span>
                ) : (
                  <span className="text-gray-500">
                    Interactive hunt area would be displayed here
                  </span>
                )}
              </p>
            </div>
          </div>
          
          {/* Objects to find list */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {hunt.hiddenObjects?.map(object => (
              <div 
                key={object.id}
                className={`p-2 rounded text-sm ${
                  foundObjects.includes(object.id)
                    ? 'bg-green-900/20 text-green-500 border border-green-900'
                    : 'bg-gray-800 text-gray-300 border border-gray-700'
                }`}
              >
                <div className="flex items-center">
                  {foundObjects.includes(object.id) ? (
                    <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                  ) : (
                    <div className="h-3 w-3 mr-1 rounded-full border border-gray-600"></div>
                  )}
                  <span>{object.name}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Hint section */}
          {showHint && (
            <div className="mt-4 p-3 bg-amber-900/20 border border-amber-900 rounded-md">
              <p className="text-sm text-amber-500 flex items-center">
                <Lightbulb className="h-4 w-4 mr-1" />
                Hint:
              </p>
              <p className="text-sm text-gray-300 mt-1">{hunt.hint}</p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowHint(!showHint)}
            className="w-full sm:w-auto"
          >
            {showHint ? (
              <><X className="h-4 w-4 mr-1" /> Hide Hint</>
            ) : (
              <><Lightbulb className="h-4 w-4 mr-1" /> Show Hint</>
            )}
          </Button>
          <Button
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            {isCompleted ? 'Continue' : 'Exit Hunt'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
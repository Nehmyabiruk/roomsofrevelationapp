import { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Puzzle } from '@/types/game';
import { AlertCircle, Check, HelpCircle, Lightbulb, RotateCw, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PuzzleSolverProps {
  puzzle: Puzzle;
  levelId: string;
  roomId: string;
  onClose: () => void;
}

export default function PuzzleSolver({ puzzle, levelId, roomId, onClose }: PuzzleSolverProps) {
  const { state, solvePuzzle } = useGame();
  const [showHint, setShowHint] = useState(false);
  const [input, setInput] = useState('');
  const [sequence, setSequence] = useState<string[]>([]);
  const [pattern, setPattern] = useState<string[]>([]);
  const [message, setMessage] = useState<{ type: 'error' | 'success' | 'info'; text: string } | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  
  // Check if all required items are in inventory
  const hasRequiredItems = puzzle.requiredItems ? 
    puzzle.requiredItems.every(itemId => 
      state.player.inventory.some(item => item.id === itemId)
    ) : true;
  
  useEffect(() => {
    if (puzzle.type === 'sequence' && Array.isArray(puzzle.solution)) {
      setSequence([]);
    }
    if (puzzle.type === 'pattern' && Array.isArray(puzzle.solution)) {
      setPattern([]);
    }
  }, [puzzle]);
  
  const handleSolveAttempt = () => {
    setAttemptCount(prev => prev + 1);
    
    if (!hasRequiredItems) {
      setMessage({ 
        type: 'error', 
        text: 'You are missing items required to solve this puzzle.' 
      });
      return;
    }
    
    let isCorrect = false;
    
    switch (puzzle.type) {
      case 'combination':
        isCorrect = input === puzzle.solution;
        break;
      case 'riddle':
        isCorrect = input.toLowerCase() === (puzzle.solution as string).toLowerCase();
        break;
      case 'sequence':
        isCorrect = JSON.stringify(sequence) === JSON.stringify(puzzle.solution);
        break;
      case 'pattern':
        isCorrect = JSON.stringify(pattern) === JSON.stringify(puzzle.solution);
        break;
      case 'hidden-object':
        // This is handled differently as it involves visual searching
        break;
    }
    
    if (isCorrect) {
      setMessage({ type: 'success', text: 'Puzzle solved!' });
      setIsSolved(true);
      setTimeout(() => {
        solvePuzzle(levelId, roomId, puzzle.id);
        onClose();
      }, 2000);
    } else {
      const remainingAttempts = puzzle.attempts ? puzzle.attempts - attemptCount - 1 : null;
      if (remainingAttempts === 0) {
        setMessage({ type: 'error', text: 'You have exhausted all attempts. Try again later.' });
        setTimeout(onClose, 2000);
      } else {
        setMessage({ 
          type: 'error', 
          text: remainingAttempts ? 
            `Incorrect solution. You have ${remainingAttempts} attempts remaining.` : 
            'Incorrect solution. Try again.' 
        });
      }
    }
  };
  
  const handleSequenceClick = (item: string) => {
    if (sequence.includes(item)) {
      setSequence(prev => prev.filter(i => i !== item));
    } else {
      setSequence(prev => [...prev, item]);
    }
  };
  
  const handlePatternSelect = (point: string) => {
    if (pattern.includes(point)) {
      // Remove this point and all points after it
      const index = pattern.indexOf(point);
      setPattern(prev => prev.slice(0, index));
    } else {
      setPattern(prev => [...prev, point]);
    }
  };
  
  const renderPuzzleInterface = () => {
    switch (puzzle.type) {
      case 'combination':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-300">{puzzle.description}</p>
            <Input
              type="text"
              placeholder="Enter combination..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
          </div>
        );
        
      case 'riddle':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-300">{puzzle.description}</p>
            <Input
              type="text"
              placeholder="Enter answer..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
          </div>
        );
        
      case 'sequence':
        // This is a simplified example - you would customize this based on the actual sequence puzzle
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-300">{puzzle.description}</p>
            <div className="grid grid-cols-3 gap-2">
              {['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'].map((color) => (
                <Button
                  key={color}
                  variant={sequence.includes(color) ? "default" : "outline"}
                  className={`${
                    sequence.includes(color) 
                      ? 'bg-amber-600 text-white' 
                      : 'border-gray-700'
                  }`}
                  onClick={() => handleSequenceClick(color)}
                >
                  {sequence.includes(color) && (
                    <span className="mr-2">{sequence.indexOf(color) + 1}</span>
                  )}
                  {color}
                </Button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => setSequence([])}
                className="text-gray-400 hover:text-white"
              >
                <RotateCw className="h-4 w-4 mr-1" /> Reset
              </Button>
              <p className="text-sm text-gray-400">
                Selected: {sequence.length} / {Array.isArray(puzzle.solution) ? puzzle.solution.length : 0}
              </p>
            </div>
          </div>
        );
        
      case 'pattern':
        // This is a simplified example - you would customize this based on the actual pattern puzzle
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-300">{puzzle.description}</p>
            <div className="grid grid-cols-3 gap-10 bg-gray-800 p-8 rounded-md">
              {['top-left', 'top-center', 'top-right', 'middle-left', 'center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'].map((point) => (
                <button
                  key={point}
                  className={`w-6 h-6 rounded-full ${
                    pattern.includes(point)
                      ? 'bg-amber-500'
                      : 'bg-gray-600 hover:bg-gray-500'
                  } transition-colors`}
                  onClick={() => handlePatternSelect(point)}
                >
                  {pattern.includes(point) && (
                    <span className="text-xs font-bold">{pattern.indexOf(point) + 1}</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => setPattern([])}
                className="text-gray-400 hover:text-white"
              >
                <RotateCw className="h-4 w-4 mr-1" /> Reset
              </Button>
              <p className="text-sm text-gray-400">
                Points: {pattern.length} / {Array.isArray(puzzle.solution) ? puzzle.solution.length : 0}
              </p>
            </div>
          </div>
        );
        
      case 'hidden-object':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-300">{puzzle.description}</p>
            <div className="flex justify-center">
              <div className="bg-gray-800 w-full h-48 rounded-md flex items-center justify-center">
                <p className="text-gray-400 text-sm">Interact with the room to find hidden objects</p>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <p className="text-sm text-gray-300">
            Unknown puzzle type. Please report this issue.
          </p>
        );
    }
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl text-amber-500">
            {puzzle.type.charAt(0).toUpperCase() + puzzle.type.slice(1)} Puzzle
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {!hasRequiredItems ? 
              'You are missing items required to solve this puzzle.' : 
              'Solve the puzzle to progress in the game.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {renderPuzzleInterface()}
          
          {message && (
            <Alert className={`mt-4 ${
              message.type === 'error' ? 'bg-red-900/20 border-red-900' : 
              message.type === 'success' ? 'bg-green-900/20 border-green-900' :
              'bg-blue-900/20 border-blue-900'
            }`}>
              {message.type === 'error' && <AlertCircle className="h-4 w-4 text-red-500" />}
              {message.type === 'success' && <Check className="h-4 w-4 text-green-500" />}
              <AlertDescription className="text-sm">
                {message.text}
              </AlertDescription>
            </Alert>
          )}
          
          {showHint && (
            <Alert className="mt-4 bg-amber-900/20 border-amber-900">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <AlertDescription className="text-sm">
                Hint: {puzzle.hint}
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? 
              <><X className="h-4 w-4 mr-1" /> Hide Hint</> : 
              <><HelpCircle className="h-4 w-4 mr-1" /> Show Hint</>
            }
          </Button>
          <Button 
            className={`w-full sm:w-auto ${
              isSolved ? 'bg-green-600 hover:bg-green-700' : 'bg-amber-600 hover:bg-amber-700'
            }`}
            onClick={handleSolveAttempt}
            disabled={!hasRequiredItems || isSolved}
          >
            {isSolved ? 
              <><Check className="h-4 w-4 mr-1" /> Solved!</> : 
              'Submit Solution'
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Room } from '@/types/game';
import { DoorClosed, Door, ArrowRight, Info } from 'lucide-react';

interface RoomTransitionProps {
  fromRoom?: Room;
  toRoom: Room;
  onComplete: () => void;
}

export default function RoomTransition({ fromRoom, toRoom, onComplete }: RoomTransitionProps) {
  const [step, setStep] = useState(0);
  const [showDialog, setShowDialog] = useState(true);
  
  // Automatic progression through transition steps
  useEffect(() => {
    if (step < 3) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, step === 0 ? 500 : 1500);
      
      return () => clearTimeout(timer);
    } else {
      // Final step - complete transition after a delay
      const timer = setTimeout(() => {
        setShowDialog(false);
        // Small additional delay to ensure animation completes before onComplete
        setTimeout(onComplete, 300);
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [step, onComplete]);
  
  const renderTransitionContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col items-center">
            <DoorClosed className="h-16 w-16 text-amber-500 animate-pulse" />
            <p className="text-lg mt-4">Exiting {fromRoom?.name || 'Current Room'}</p>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-center">
            <ArrowRight className="h-16 w-16 text-blue-400 animate-bounce" />
            <p className="text-lg mt-4">Moving to next area...</p>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center">
            <Door className="h-16 w-16 text-green-500 animate-pulse" />
            <p className="text-lg mt-4">Entering {toRoom.name}</p>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center">
            <Info className="h-16 w-16 text-amber-500" />
            <p className="text-xl font-bold mt-4">{toRoom.name}</p>
            <p className="text-sm text-gray-400 mt-2 text-center px-8">
              {toRoom.description}
            </p>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={showDialog} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900/90 border-gray-700 transition-all duration-700">
        <div className="flex justify-center items-center py-8">
          {renderTransitionContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
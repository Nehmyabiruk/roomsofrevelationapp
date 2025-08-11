import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Backpack, BookOpen, Brain, Compass, Key, Lock, MapPin, Search, Sparkles, Target } from 'lucide-react';

interface InstructionsProps {
  onClose: () => void;
}

export default function Instructions({ onClose }: InstructionsProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-500 flex items-center gap-2">
            <BookOpen className="h-5 w-5" /> How to Play
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Welcome to Escape Legacy: Dark Passages
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="basics">
          <TabsList className="grid grid-cols-3 bg-gray-800 mb-4">
            <TabsTrigger value="basics" className="data-[state=active]:bg-gray-700">Basics</TabsTrigger>
            <TabsTrigger value="gameplay" className="data-[state=active]:bg-gray-700">Gameplay</TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-gray-700">Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics" className="mt-0">
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 border-b border-gray-800 pb-3">
                <MapPin className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Navigation</h3>
                  <p className="text-gray-300">
                    Use the tabs at the bottom of the screen to navigate between the Room view, 
                    your Inventory, Story progress, and Level selection. Each room contains items 
                    to collect, puzzles to solve, and hidden objects to find.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 border-b border-gray-800 pb-3">
                <Backpack className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Inventory</h3>
                  <p className="text-gray-300">
                    Collect items by tapping on them in the room. Items are stored in your inventory
                    and can be examined, used, or combined with other items. Some items are keys that
                    unlock doors, while others are required to solve puzzles.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 border-b border-gray-800 pb-3">
                <Lock className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Rooms & Locks</h3>
                  <p className="text-gray-300">
                    Some rooms are locked and require specific keys to enter. Keys can be found by
                    solving puzzles, completing hunts, or examining areas carefully. Once you have
                    the right key, you can access the locked room from the room selection screen.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Story</h3>
                  <p className="text-gray-300">
                    The game follows a story-driven narrative. Pay attention to story elements, character
                    dialogues, and documents you find as they often contain vital clues for progressing.
                    Check the Story tab to review important narrative developments.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="gameplay" className="mt-0">
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 border-b border-gray-800 pb-3">
                <Brain className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Solving Puzzles</h3>
                  <p className="text-gray-300">
                    Puzzles come in different types: combination locks, patterns, riddles, hidden objects,
                    and sequences. Each puzzle has a hint available if you get stuck. Some puzzles require
                    specific items from your inventory to solve.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 border-b border-gray-800 pb-3">
                <Search className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Hunts</h3>
                  <p className="text-gray-300">
                    Hunt challenges require you to find hidden objects or mechanisms in a room.
                    Complete these hunts to earn special rewards and items that may be crucial
                    for your progression. Look carefully and think about what might be concealed.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 border-b border-gray-800 pb-3">
                <Key className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Using & Combining Items</h3>
                  <p className="text-gray-300">
                    Some items can be used on their own, while others need to be combined with
                    compatible items to create new tools or solve puzzles. Examine your inventory
                    regularly and try different combinations when you get stuck.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Game Progression</h3>
                  <p className="text-gray-300">
                    To complete a room, solve all puzzles within it. To complete a level,
                    solve all rooms in that level. Your progress is shown in the progress bar
                    at the top of the screen. New levels unlock as you complete the current one.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tips" className="mt-0">
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 border-b border-gray-800 pb-3">
                <Sparkles className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Take Notes</h3>
                  <p className="text-gray-300">
                    Some puzzles may require remembering information from different locations.
                    It can be helpful to take notes on clues, patterns, and codes you encounter
                    throughout the game.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 border-b border-gray-800 pb-3">
                <Compass className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Explore Thoroughly</h3>
                  <p className="text-gray-300">
                    Don't rush! Take time to explore each room completely, look for interactive
                    elements, and read all documents. Small details often hold important clues.
                    If you're stuck, revisit rooms you've already completed for missed clues.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 border-b border-gray-800 pb-3">
                <Brain className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Use Hints Wisely</h3>
                  <p className="text-gray-300">
                    Each puzzle comes with a hint. Use them if you're genuinely stuck, but
                    try to solve puzzles on your own first for the most rewarding experience.
                    Hints are designed to guide you without giving away the full solution.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Follow the Story</h3>
                  <p className="text-gray-300">
                    The narrative provides context for your mission and often contains subtle
                    clues about what to look for next. Pay attention to character dialogues,
                    journal entries, and other story elements as they unfold.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button onClick={onClose} className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700">
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
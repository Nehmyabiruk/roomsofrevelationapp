import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ChevronRight, Key, Wrench } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Item } from '@/types/game';

interface ItemCombinerProps {
  item: Item;
  onClose: () => void;
}

export default function ItemCombiner({ item, onClose }: ItemCombinerProps) {
  const { state, combineItems } = useGame();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  
  // Filter out the current item and items that cannot be combined
  const combinableItems = state.player.inventory.filter(
    i => i.id !== item.id && i.canCombine
  );
  
  const handleSelectItem = (selectedItem: Item) => {
    setSelectedItem(selectedItem);
    
    // Check if these items can be combined
    const combination = state.combinations.find(combo => 
      (combo.item1Id === item.id && combo.item2Id === selectedItem.id) ||
      (combo.item1Id === selectedItem.id && combo.item2Id === item.id)
    );
    
    if (combination) {
      setMessage({ type: 'success', text: 'These items can be combined!' });
    } else {
      setMessage({ type: 'error', text: 'These items cannot be combined together.' });
      setTimeout(() => {
        setMessage(null);
        setSelectedItem(null);
      }, 2000);
    }
  };
  
  const handleCombine = () => {
    if (!selectedItem) return;
    
    // Try to combine the items
    const result = combineItems(item.id, selectedItem.id);
    
    if (result.success) {
      setMessage({ type: 'success', text: `Created: ${result.newItem?.name}!` });
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setMessage({ type: 'error', text: 'These items cannot be combined.' });
      setTimeout(() => {
        setMessage(null);
        setSelectedItem(null);
      }, 2000);
    }
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl text-amber-500 flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Combine Items
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Select an item to combine with {item.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex justify-center mb-4">
            <Card className="w-full border-amber-500">
              <CardHeader className="p-3 pb-0">
                <CardTitle className="text-base">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-2 text-sm text-gray-400">
                Selected item
              </CardContent>
            </Card>
          </div>
          
          {message && (
            <Alert className={`mb-4 ${
              message.type === 'error' ? 'bg-red-900/20 border-red-900' : 'bg-green-900/20 border-green-900'
            }`}>
              <AlertCircle className={`h-4 w-4 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`} />
              <AlertDescription>
                {message.text}
              </AlertDescription>
            </Alert>
          )}
          
          {combinableItems.length === 0 ? (
            <div className="text-center text-gray-400 py-6">
              <p>No items available for combination.</p>
              <p className="text-xs mt-1">Find more items to unlock combinations.</p>
            </div>
          ) : (
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-2">
                {combinableItems.map(item => (
                  <Card
                    key={item.id}
                    className={`cursor-pointer transition-colors ${
                      selectedItem?.id === item.id 
                        ? 'border-green-500 bg-green-900/20' 
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => handleSelectItem(item)}
                  >
                    <CardHeader className="p-3 pb-0">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{item.name}</CardTitle>
                        {item.isKey && <Key className="h-4 w-4 text-amber-500" />}
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-2 flex justify-end">
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            variant="ghost"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700"
            disabled={!selectedItem || message?.type === 'error'}
            onClick={handleCombine}
          >
            Combine Items
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
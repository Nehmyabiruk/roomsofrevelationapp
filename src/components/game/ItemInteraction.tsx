import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Item } from '@/types/game';
import { Key } from 'lucide-react';

interface ItemInteractionProps {
  item: Item;
  onClose: () => void;
  onCollect: (item: Item) => void;
}

export default function ItemInteraction({ item, onClose, onCollect }: ItemInteractionProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl text-amber-500 flex items-center gap-2">
            {item.name}
            {item.isKey && <Key className="h-4 w-4 text-amber-500" />}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Examine the item before collecting it
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 flex flex-col items-center">
          <div 
            className="w-48 h-48 rounded-lg border border-gray-700 bg-center bg-contain bg-no-repeat mb-4"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          />
          <p className="text-sm text-gray-300">
            {item.description}
          </p>
          
          {item.isKey && (
            <div className="mt-2 bg-amber-900/20 border border-amber-900 p-2 rounded-md w-full">
              <p className="text-xs text-amber-500">This appears to be a key that might unlock something.</p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button
            className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700"
            onClick={() => onCollect(item)}
          >
            Collect Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
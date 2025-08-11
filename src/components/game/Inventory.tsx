import { useGame } from '@/contexts/GameContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Key, Package, Archive, ChevronRight } from 'lucide-react';
import ItemCombiner from './ItemCombiner';

export default function Inventory() {
  const { state, removeItemFromInventory, canUseItem } = useGame();
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showCombineDialog, setShowCombineDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowItemDetails(true);
  };
  
  const handleUseItem = () => {
    // Logic for using items would be implemented here
    setShowItemDetails(false);
  };
  
  const handleCombineItems = () => {
    setShowItemDetails(false);
    setShowCombineDialog(true);
  };
  
  const handleDiscardItem = () => {
    if (selectedItem) {
      removeItemFromInventory(selectedItem.id);
    }
    setShowItemDetails(false);
  };
  
  // Filter items based on active tab
  const filterItems = () => {
    switch (activeTab) {
      case 'keys':
        return state.player.inventory.filter(item => item.isKey);
      case 'usable':
        return state.player.inventory.filter(item => item.isUsable);
      case 'documents':
        return state.player.inventory.filter(item => 
          item.name.toLowerCase().includes('note') || 
          item.name.toLowerCase().includes('journal') || 
          item.name.toLowerCase().includes('document') ||
          item.name.toLowerCase().includes('file') ||
          item.name.toLowerCase().includes('formula')
        );
      default:
        return state.player.inventory;
    }
  };
  
  const filteredItems = filterItems();
  const canBeUsed = selectedItem && canUseItem(selectedItem.id);
  const canBeCombined = selectedItem && selectedItem.canCombine;
  
  return (
    <div className="h-full flex flex-col p-4 bg-gray-950/50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-amber-500">
          Inventory ({state.player.inventory.length})
        </h2>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList className="grid grid-cols-4 bg-gray-800">
          <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">All</TabsTrigger>
          <TabsTrigger value="keys" className="data-[state=active]:bg-gray-700">Keys</TabsTrigger>
          <TabsTrigger value="usable" className="data-[state=active]:bg-gray-700">Usable</TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-gray-700">Documents</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow text-gray-500">
          <Package className="h-16 w-16 mb-2" />
          <p>{activeTab === 'all' ? 'Your inventory is empty' : 'No items in this category'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto flex-grow">
          {filteredItems.map(item => (
            <Card 
              key={item.id}
              className="cursor-pointer hover:border-amber-500 transition-colors"
              onClick={() => handleItemClick(item)}
            >
              <CardHeader className="p-3 pb-0">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{item.name}</CardTitle>
                  {item.isKey && <Key className="h-4 w-4 text-amber-500" />}
                </div>
                <CardDescription className="text-xs line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-2 flex justify-end">
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Item Detail Dialog */}
      <Dialog open={showItemDetails} onOpenChange={setShowItemDetails}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl text-amber-500 flex items-center gap-2">
                  {selectedItem.name}
                  {selectedItem.isKey && <Key className="h-4 w-4 text-amber-500" />}
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  {selectedItem.description}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 flex justify-center">
                <div 
                  className="w-32 h-32 rounded-lg border border-gray-700 bg-center bg-contain bg-no-repeat"
                  style={{ backgroundImage: `url(${selectedItem.imageUrl})` }}
                />
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                {canBeUsed && (
                  <Button 
                    className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700"
                    onClick={handleUseItem}
                  >
                    Use Item
                  </Button>
                )}
                {canBeCombined && (
                  <Button 
                    className="w-full sm:w-auto"
                    variant="outline"
                    onClick={handleCombineItems}
                  >
                    Combine With...
                  </Button>
                )}
                <Button 
                  className="w-full sm:w-auto"
                  variant="destructive"
                  onClick={handleDiscardItem}
                >
                  Discard
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Item Combiner Dialog */}
      {showCombineDialog && selectedItem && (
        <ItemCombiner 
          item={selectedItem}
          onClose={() => setShowCombineDialog(false)}
        />
      )}
    </div>
  );
}
import { useGame } from '@/contexts/GameContext';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Moon, Sun, Volume2, Save, RotateCcw, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SettingsPanelProps {
  onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { state, setTheme, toggleSound, setMusicVolume, setSfxVolume, resetGame } = useGame();
  
  const [musicVol, setMusicVol] = useState(state.settings.musicVolume * 100);
  const [sfxVol, setSfxVol] = useState(state.settings.sfxVolume * 100);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  const handleSaveSettings = () => {
    // Update volumes in the game state
    setMusicVolume(musicVol / 100);
    setSfxVolume(sfxVol / 100);
    onClose();
  };
  
  const handleResetGame = () => {
    resetGame();
    onClose();
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-500">Settings</DialogTitle>
          <DialogDescription className="text-gray-300">
            Customize your game experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Theme</Label>
              <p className="text-sm text-gray-400">
                Choose between light and dark mode
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sun className={`h-4 w-4 ${state.settings.theme === 'light' ? 'text-amber-500' : 'text-gray-500'}`} />
              <Switch 
                checked={state.settings.theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
              <Moon className={`h-4 w-4 ${state.settings.theme === 'dark' ? 'text-purple-400' : 'text-gray-500'}`} />
            </div>
          </div>
          
          {/* Sound Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Sound</Label>
              <p className="text-sm text-gray-400">
                Enable or disable all game sounds
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className={`h-4 w-4 ${state.settings.soundEnabled ? 'text-green-500' : 'text-gray-500'}`} />
              <Switch 
                checked={state.settings.soundEnabled}
                onCheckedChange={toggleSound}
              />
            </div>
          </div>
          
          {/* Music Volume */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label className="text-base">Music Volume</Label>
              <span className="text-sm text-gray-400">{Math.round(musicVol)}%</span>
            </div>
            <Slider
              defaultValue={[musicVol]}
              max={100}
              step={1}
              disabled={!state.settings.soundEnabled}
              onValueChange={(value) => setMusicVol(value[0])}
              className={!state.settings.soundEnabled ? 'opacity-50' : ''}
            />
          </div>
          
          {/* Sound Effects Volume */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label className="text-base">Sound Effects</Label>
              <span className="text-sm text-gray-400">{Math.round(sfxVol)}%</span>
            </div>
            <Slider
              defaultValue={[sfxVol]}
              max={100}
              step={1}
              disabled={!state.settings.soundEnabled}
              onValueChange={(value) => setSfxVol(value[0])}
              className={!state.settings.soundEnabled ? 'opacity-50' : ''}
            />
          </div>
          
          {/* Reset Game */}
          <div className="pt-2">
            <Button 
              variant="destructive" 
              onClick={() => setShowResetConfirm(true)}
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Game Progress
            </Button>
            <p className="text-xs text-gray-400 mt-1 text-center">
              This will delete all saved progress and start a new game
            </p>
          </div>
          
          {/* Reset Confirmation */}
          {showResetConfirm && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Are you sure? All progress will be lost.
                <div className="flex gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowResetConfirm(false)}
                    className="text-xs h-8"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleResetGame}
                    className="text-xs h-8"
                  >
                    Yes, Reset Everything
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleSaveSettings}
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
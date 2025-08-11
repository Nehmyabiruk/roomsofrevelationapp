import { useGame } from '@/contexts/GameContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function StoryNarration() {
  const { state } = useGame();
  const { characters, player } = state;
  
  const playerCharacter = characters.find(char => char.id === 'player');
  const currentLevel = state.levels.find(level => level.id === player.currentLevelId);
  
  // Get all completed levels for story progression
  const completedLevels = state.levels.filter(level => 
    player.completedLevels.includes(level.id)
  );
  
  return (
    <div className="h-full flex flex-col p-4 bg-gray-950/50">
      <h2 className="text-xl font-bold text-amber-500 mb-4 flex items-center">
        <BookOpen className="h-5 w-5 mr-2" /> 
        Story Journal
      </h2>
      
      <ScrollArea className="flex-grow">
        <div className="space-y-6 pb-6">
          {/* Intro Story */}
          <Card className="border-gray-800 bg-gray-900/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-4 w-4 text-purple-400" />
                {playerCharacter?.name || 'Detective'}
              </CardTitle>
              <CardDescription>Mission Brief</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              {playerCharacter?.dialogues.intro.map((line, i) => (
                <p key={i} className={`${i > 0 ? 'mt-2' : ''} text-gray-300`}>{line}</p>
              ))}
            </CardContent>
          </Card>
          
          {/* Current Level */}
          {currentLevel && (
            <div className="space-y-2">
              <h3 className="text-md font-semibold text-amber-400 flex items-center">
                <FileText className="h-4 w-4 mr-2" /> Current Investigation
              </h3>
              <Card className="border-amber-900/30 bg-gradient-to-br from-gray-900 to-amber-950/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">{currentLevel.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm italic text-gray-300">
                  "{currentLevel.storyIntro}"
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Collected Documents/Journal Entries */}
          <div className="space-y-2">
            <h3 className="text-md font-semibold text-gray-200 flex items-center">
              <FileText className="h-4 w-4 mr-2" /> Collected Documents
            </h3>
            
            {player.inventory.filter(item => 
              item.name.toLowerCase().includes('journal') || 
              item.name.toLowerCase().includes('note') ||
              item.name.toLowerCase().includes('document') ||
              item.name.toLowerCase().includes('file')
            ).map(document => (
              <Card key={document.id} className="border-gray-800 bg-gray-900/60">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{document.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-gray-300">
                  {document.description}
                  
                  {/* For journal entries from characters */}
                  {document.id === 'dusty-journal' && characters.find(char => char.id === 'manor-owner') && (
                    <div className="mt-2 p-2 bg-gray-800 rounded-md border border-gray-700">
                      <p className="font-semibold text-gray-200 mb-1">Excerpts:</p>
                      {characters.find(char => char.id === 'manor-owner')?.dialogues.journal.map((line, i) => (
                        <p key={i} className="italic text-gray-400 mt-1">{line}</p>
                      ))}
                    </div>
                  )}
                  
                  {document.id === 'patient-journal' && characters.find(char => char.id === 'hospital-director') && (
                    <div className="mt-2 p-2 bg-gray-800 rounded-md border border-gray-700">
                      <p className="font-semibold text-gray-200 mb-1">Excerpts:</p>
                      {characters.find(char => char.id === 'hospital-director')?.dialogues.notes.map((line, i) => (
                        <p key={i} className="italic text-gray-400 mt-1">{line}</p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {player.inventory.filter(item => 
              item.name.toLowerCase().includes('journal') || 
              item.name.toLowerCase().includes('note') ||
              item.name.toLowerCase().includes('document') ||
              item.name.toLowerCase().includes('file')
            ).length === 0 && (
              <p className="text-sm text-gray-500 italic px-1">
                No documents collected yet. Explore rooms to find journals and notes.
              </p>
            )}
          </div>
          
          {/* Completed Levels */}
          {completedLevels.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-md font-semibold text-green-400 flex items-center">
                <FileText className="h-4 w-4 mr-2" /> Solved Mysteries
              </h3>
              
              {completedLevels.map(level => (
                <Card key={level.id} className="border-green-900/30 bg-gradient-to-br from-gray-900 to-green-950/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md flex items-center gap-2">
                      {level.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="text-gray-300">
                      {level.storyOutro}
                    </p>
                    
                    {level.id === 'level1' && playerCharacter?.dialogues.level1Completion && (
                      <div className="mt-2 pt-2 border-t border-gray-800">
                        <p className="font-semibold text-gray-200 flex items-center gap-1 mb-1">
                          <User className="h-3 w-3 text-purple-400" />
                          Detective's Notes:
                        </p>
                        {playerCharacter?.dialogues.level1Completion.map((line, i) => (
                          <p key={i} className="text-gray-400 mt-1">{line}</p>
                        ))}
                      </div>
                    )}
                    
                    {level.id === 'level2' && playerCharacter?.dialogues.level2Completion && (
                      <div className="mt-2 pt-2 border-t border-gray-800">
                        <p className="font-semibold text-gray-200 flex items-center gap-1 mb-1">
                          <User className="h-3 w-3 text-purple-400" />
                          Detective's Notes:
                        </p>
                        {playerCharacter?.dialogues.level2Completion.map((line, i) => (
                          <p key={i} className="text-gray-400 mt-1">{line}</p>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Timeline */}
          <div className="space-y-2">
            <h3 className="text-md font-semibold text-blue-400 flex items-center">
              <FileText className="h-4 w-4 mr-2" /> Investigation Timeline
            </h3>
            
            <div className="space-y-4 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-700">
              <div className="relative">
                <div className="absolute left-[-23px] top-1 h-3 w-3 rounded-full bg-amber-500"></div>
                <p className="text-amber-500 font-medium text-sm">Case Opened</p>
                <p className="text-xs text-gray-400">Initial reports of disappearances lead to the abandoned manor investigation.</p>
              </div>
              
              {player.completedRooms.includes('manor-entrance') && (
                <div className="relative">
                  <div className="absolute left-[-23px] top-1 h-3 w-3 rounded-full bg-blue-500"></div>
                  <p className="text-blue-400 font-medium text-sm">Manor Entrance Explored</p>
                  <p className="text-xs text-gray-400">Found evidence of strange activities and a journal with concerning entries.</p>
                </div>
              )}
              
              {player.completedRooms.includes('manor-library') && (
                <div className="relative">
                  <div className="absolute left-[-23px] top-1 h-3 w-3 rounded-full bg-blue-500"></div>
                  <p className="text-blue-400 font-medium text-sm">Library Secrets Uncovered</p>
                  <p className="text-xs text-gray-400">Discovered hidden documents and a key to the manor owner's study.</p>
                </div>
              )}
              
              {player.completedRooms.includes('manor-study') && (
                <div className="relative">
                  <div className="absolute left-[-23px] top-1 h-3 w-3 rounded-full bg-blue-500"></div>
                  <p className="text-blue-400 font-medium text-sm">Study Investigated</p>
                  <p className="text-xs text-gray-400">Found research notes detailing unethical experiments and a key to the basement.</p>
                </div>
              )}
              
              {player.completedRooms.includes('manor-basement') && (
                <div className="relative">
                  <div className="absolute left-[-23px] top-1 h-3 w-3 rounded-full bg-green-500"></div>
                  <p className="text-green-400 font-medium text-sm">Hidden Laboratory Discovered</p>
                  <p className="text-xs text-gray-400">Uncovered the truth about the disappearances and the owner's twisted experiments.</p>
                </div>
              )}
              
              {player.completedLevels.includes('level1') && (
                <div className="relative">
                  <div className="absolute left-[-23px] top-1 h-3 w-3 rounded-full bg-purple-500"></div>
                  <p className="text-purple-400 font-medium text-sm">Manor Investigation Complete</p>
                  <p className="text-xs text-gray-400">Found evidence leading to an abandoned hospital and connections to a larger conspiracy.</p>
                </div>
              )}
              
              {player.completedRooms.includes('hospital-reception') && (
                <div className="relative">
                  <div className="absolute left-[-23px] top-1 h-3 w-3 rounded-full bg-blue-500"></div>
                  <p className="text-blue-400 font-medium text-sm">Hospital Reception Searched</p>
                  <p className="text-xs text-gray-400">Found patient records and evidence of continued operations after official closure.</p>
                </div>
              )}
              
              {player.completedRooms.includes('hospital-ward') && (
                <div className="relative">
                  <div className="absolute left-[-23px] top-1 h-3 w-3 rounded-full bg-blue-500"></div>
                  <p className="text-blue-400 font-medium text-sm">Patient Ward Examined</p>
                  <p className="text-xs text-gray-400">Discovered disturbing evidence of patient experimentation and a code to the laboratory.</p>
                </div>
              )}
              
              {player.completedRooms.includes('hospital-lab') && (
                <div className="relative">
                  <div className="absolute left-[-23px] top-1 h-3 w-3 rounded-full bg-blue-500"></div>
                  <p className="text-blue-400 font-medium text-sm">Research Lab Infiltrated</p>
                  <p className="text-xs text-gray-400">Found research documents detailing the connection between the manor and hospital experiments.</p>
                </div>
              )}
              
              {player.completedRooms.includes('hospital-directors-office') && (
                <div className="relative">
                  <div className="absolute left-[-23px] top-1 h-3 w-3 rounded-full bg-green-500"></div>
                  <p className="text-green-400 font-medium text-sm">Director's Office Secrets Revealed</p>
                  <p className="text-xs text-gray-400">Uncovered evidence of government involvement and corporate funding for unethical research.</p>
                </div>
              )}
              
              {player.completedLevels.includes('level2') && (
                <div className="relative">
                  <div className="absolute left-[-23px] top-1 h-3 w-3 rounded-full bg-purple-500"></div>
                  <p className="text-purple-400 font-medium text-sm">Hospital Investigation Complete</p>
                  <p className="text-xs text-gray-400">Gathered evidence of a larger conspiracy and discovered the location of the main research facility.</p>
                </div>
              )}
              
              {!player.completedLevels.length && !player.completedRooms.length && (
                <div className="relative">
                  <div className="absolute left-[-23px] top-1 h-3 w-3 rounded-full bg-gray-500"></div>
                  <p className="text-gray-400 font-medium text-sm">Investigation Pending</p>
                  <p className="text-xs text-gray-500">Start exploring the manor to begin your investigation.</p>
                </div>
              )}
              
              {player.gameProgress >= 100 ? (
                <div className="relative">
                  <div className="absolute left-[-23px] top-1 h-3 w-3 rounded-full bg-green-600"></div>
                  <p className="text-green-400 font-medium text-sm">Case Solved</p>
                  <p className="text-xs text-gray-400">All mysteries have been solved and evidence collected to expose the conspiracy.</p>
                </div>
              ) : player.gameProgress > 0 ? (
                <div className="relative">
                  <div className="absolute left-[-23px] top-1 h-3 w-3 rounded-full bg-amber-600 animate-pulse"></div>
                  <p className="text-amber-400 font-medium text-sm">Investigation Ongoing</p>
                  <p className="text-xs text-gray-400">Continue exploring to uncover the full truth.</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
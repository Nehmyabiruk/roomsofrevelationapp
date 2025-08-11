import { GameState, Level } from '@/types/game';

// Initial levels with rooms, puzzles, items, and hunts
export const gameLevels: Level[] = [
  {
    id: 'level1',
    name: 'The Forgotten Manor',
    description: 'An abandoned Victorian manor with a dark past and many secrets to uncover.',
    storyIntro: 'As a private investigator looking into a series of mysterious disappearances, your search has led you to this abandoned manor. The locals speak of strange noises and ghostly sightings. The last victim was seen entering but never left. Youve been hired to find out what happened, but as you enter the manor, the door slams shut behind you...',
    storyOutro: 'Youve uncovered evidence linking the manors owner to the disappearances. He was conducting forbidden experiments in the basement. Your findings will help bring justice to the victims families, but theres more to this mystery than meets the eye...',
    difficulty: 'medium',
    rooms: [
      {
        id: 'manor-entrance',
        name: 'Grand Entrance',
        description: 'A once-elegant foyer now covered in dust and cobwebs. Ornate woodwork and peeling wallpaper hint at its former glory.',
        backgroundImage: '/assets/rooms/manor-entrance.jpg',
        puzzles: [
          {
            id: 'entrance-lock',
            type: 'combination',
            description: 'The door that slammed shut has an unusual lock mechanism with rotating rings. You need to align the symbols correctly to unlock it.',
            hint: 'Look for the pattern in the torn wallpaper - the symbols repeat in a specific sequence.',
            solved: false,
            solution: '3-6-4-1',
          }
        ],
        items: [
          {
            id: 'dusty-journal',
            name: 'Dusty Journal',
            description: 'A leather-bound journal with partially legible entries. Some pages mention "experiments" and "forbidden knowledge".',
            imageUrl: '/assets/items/dusty-journal.png',
            isUsable: true,
          },
          {
            id: 'rusty-key',
            name: 'Rusty Key',
            description: 'An old iron key with intricate carvings. It looks like it might fit an antique door lock.',
            imageUrl: '/assets/items/rusty-key.png',
            isKey: true,
            isUsable: true,
          }
        ],
        hunts: [
          {
            id: 'hidden-compartment',
            description: 'There\'s a hollow sound when you tap certain parts of the wall. Find the hidden compartment.',
            completed: false,
            reward: {
              id: 'old-photograph',
              name: 'Old Photograph',
              description: 'A faded photograph showing a family standing in front of the manor when it was new. There are strange markings on the back.',
              imageUrl: '/assets/items/old-photograph.png',
              isUsable: true,
            }
          }
        ],
        isLocked: false,
        completionText: 'Youve examined the entrance thoroughly. There are three doors leading deeper into the manor: one to the library, one to the dining room, and a locked door to what appears to be a study.',
        isCompleted: false,
      },
      {
        id: 'manor-library',
        name: 'Decaying Library',
        description: 'Rows of bookshelves filled with moldy tomes. A large desk sits in the center, and strange symbols are carved into the wood panels on the walls.',
        backgroundImage: '/assets/rooms/manor-library.jpg',
        puzzles: [
          {
            id: 'bookshelf-puzzle',
            type: 'sequence',
            description: 'Several books are marked with colored ribbons. When pulled in the correct order, you hear a mechanism click somewhere nearby.',
            hint: 'The color sequence matches the spectrum of light - remember the rainbow?',
            solved: false,
            solution: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
          },
          {
            id: 'desk-drawer',
            type: 'hidden-object',
            description: 'The desk has a hidden compartment, but the trigger mechanism is not obvious.',
            hint: 'Press the decorative elements in the correct order. The worn areas suggest which ones are used most often.',
            solved: false,
            requiredItems: ['magnifying-glass'],
          }
        ],
        items: [
          {
            id: 'magnifying-glass',
            name: 'Magnifying Glass',
            description: 'An antique brass magnifying glass with an ornate handle. Useful for examining small details.',
            imageUrl: '/assets/items/magnifying-glass.png',
            isUsable: true,
          },
          {
            id: 'strange-book',
            name: 'Strange Book',
            description: 'A book written in cipher with diagrams of human anatomy and unusual apparatus.',
            imageUrl: '/assets/items/strange-book.png',
            isUsable: true,
          }
        ],
        hunts: [
          {
            id: 'hidden-safe',
            description: 'There\'s a safe hidden behind one of the bookshelves. Find it and discover whats inside.',
            completed: false,
            reward: {
              id: 'study-key',
              name: 'Ornate Study Key',
              description: 'A polished silver key with an intricate design featuring an owl - the family crest of the manors owner.',
              imageUrl: '/assets/items/ornate-key.png',
              isKey: true,
              isUsable: true,
            }
          }
        ],
        isLocked: false,
        isCompleted: false,
      },
      {
        id: 'manor-study',
        name: 'Master Study',
        description: 'A well-appointed room with expensive furniture and scientific instruments. Papers are scattered everywhere, and strange diagrams cover the walls.',
        backgroundImage: '/assets/rooms/manor-study.jpg',
        puzzles: [
          {
            id: 'safe-combination',
            type: 'combination',
            description: 'A wall safe with a numerical dial lock.',
            hint: 'The combination is hidden in the old photograph - look at the numbers inscribed on the gate posts.',
            solved: false,
            requiredItems: ['old-photograph'],
            solution: '18-73-42',
          },
          {
            id: 'map-puzzle',
            type: 'pattern',
            description: 'A map of the local area with pins marking locations. Some pins seem to be missing.',
            hint: 'The journal entries describe the locations of all incidents. Place the pins where the disappearances occurred.',
            solved: false,
            requiredItems: ['dusty-journal'],
            solution: ['forest-path', 'old-mill', 'church-yard', 'town-square', 'river-bend'],
          }
        ],
        items: [
          {
            id: 'basement-key',
            name: 'Basement Key',
            description: 'A heavy iron key with skull motifs. It feels cold to the touch.',
            imageUrl: '/assets/items/basement-key.png',
            isKey: true,
            isUsable: true,
          },
          {
            id: 'strange-device',
            name: 'Strange Device',
            description: 'A brass and glass device with dials and lenses. Its purpose is unclear, but it hums with energy when activated.',
            imageUrl: '/assets/items/strange-device.png',
            isUsable: true,
            canCombine: true,
            combinesWith: ['crystal'],
          }
        ],
        hunts: [
          {
            id: 'hidden-message',
            description: 'There are faint pencil impressions on a notepad. Recover the message that was written on the previous page.',
            completed: false,
            reward: {
              id: 'secret-formula',
              name: 'Secret Formula',
              description: 'A chemical formula for what appears to be an experimental serum. Notes in the margin mention "transcendence" and "transformation."',
              imageUrl: '/assets/items/secret-formula.png',
              isUsable: true,
            }
          }
        ],
        isLocked: true,
        requiredKeyId: 'study-key',
        isCompleted: false,
      },
      {
        id: 'manor-basement',
        name: 'Hidden Laboratory',
        description: 'A macabre underground laboratory with experimental equipment, specimen jars, and restraint tables. The air is thick with the smell of chemicals and decay.',
        backgroundImage: '/assets/rooms/manor-basement.jpg',
        puzzles: [
          {
            id: 'control-panel',
            type: 'sequence',
            description: 'A complex control panel with switches, dials, and buttons. It seems to control power to various parts of the lab.',
            hint: 'The sequence is documented in the formula notes - follow the power flow diagram.',
            solved: false,
            requiredItems: ['secret-formula'],
            solution: ['main-power', 'auxiliary', 'capacitor', 'transformer', 'output'],
          },
          {
            id: 'specimen-cabinet',
            type: 'riddle',
            description: 'A locked cabinet with unusual specimens. The lock has words instead of numbers.',
            hint: 'The riddle refers to elements of the human body that were subjects of the experiments.',
            solved: false,
            solution: 'BLOOD',
          }
        ],
        items: [
          {
            id: 'crystal',
            name: 'Strange Crystal',
            description: 'A pulsing crystal that glows with an inner light. It feels warm and vibrates slightly when held.',
            imageUrl: '/assets/items/crystal.png',
            isUsable: true,
            canCombine: true,
            combinesWith: ['strange-device'],
          },
          {
            id: 'research-notes',
            name: 'Research Notes',
            description: 'Detailed notes on experiments involving human subjects and an unknown energy source.',
            imageUrl: '/assets/items/research-notes.png',
            isUsable: true,
          }
        ],
        hunts: [
          {
            id: 'secret-passage',
            description: 'There\'s a draft coming from one wall. Find the mechanism to open the secret passage.',
            completed: false,
            reward: {
              id: 'final-evidence',
              name: 'Final Evidence',
              description: 'A recording device with the manor owner confessing to his crimes and explaining his twisted experiments.',
              imageUrl: '/assets/items/final-evidence.png',
              isUsable: true,
            }
          }
        ],
        isLocked: true,
        requiredKeyId: 'basement-key',
        completionText: 'The evidence youve gathered reveals the horrible truth about the disappearances. The manors owner was conducting unethical experiments trying to achieve immortality. His last entry suggests he succeeded in some way, but at a terrible cost...',
        isCompleted: false,
      }
    ],
    isUnlocked: true,
    isCompleted: false,
  },
  {
    id: 'level2',
    name: 'The Abandoned Hospital',
    description: 'A derelict psychiatric facility with a history of experimental treatments and mysterious patient disappearances.',
    storyIntro: 'Following leads from the evidence in the manor, youve tracked the owners research partner to this abandoned hospital. The facility was shut down decades ago after allegations of patient mistreatment, but rumors suggest that illegal experiments continued in secret. As you enter the decaying building, you feel watched by unseen eyes...',
    storyOutro: 'The hospital holds dark secrets about illegal human experimentation. The scientists were searching for ways to enhance human abilities using forbidden techniques. Youve found evidence linking them to a larger conspiracy, but the mastermind remains at large...',
    difficulty: 'hard',
    rooms: [
      {
        id: 'hospital-reception',
        name: 'Reception Area',
        description: 'A dilapidated reception area with broken furniture and scattered papers. The reception desk still has an old computer and filing cabinets.',
        backgroundImage: '/images/Reception.jpg',
        puzzles: [
          {
            id: 'computer-login',
            type: 'combination',
            description: 'An old computer that surprisingly still works. It requires a password to access the patient database.',
            hint: 'Check the sticky notes hidden under the keyboard and around the monitor frame.',
            solved: false,
            solution: 'PROJECT_ASCENSION',
          }
        ],
        items: [
          {
            id: 'patient-file',
            name: 'Patient File',
            description: 'A file for Patient #137 with unusual treatment notes and references to "enhanced abilities".',
            imageUrl: '/assets/items/patient-file.png',
            isUsable: true,
          },
          {
            id: 'reception-keycard',
            name: 'Staff Keycard',
            description: 'A faded keycard with security clearance for the main hospital areas.',
            imageUrl: '/assets/items/keycard.png',
            isKey: true,
            isUsable: true,
          }
        ],
        hunts: [
          {
            id: 'hidden-safe-reception',
            description: 'There\'s a wall safe behind a fallen painting. Find the combination to open it.',
            completed: false,
            reward: {
              id: 'security-override',
              name: 'Security Override Code',
              description: 'A sequence of numbers and letters that can override electronic locks in emergency situations.',
              imageUrl: '/assets/items/security-code.png',
              isUsable: true,
            }
          }
        ],
        isLocked: false,
        isCompleted: false,
      },
      {
        id: 'hospital-ward',
        name: 'Patient Ward',
        description: 'A long room with rusted bed frames and medical equipment. Strange restraints are attached to some beds, and the walls are covered in disturbing patient writings and drawings.',
        backgroundImage: '/assets/rooms/hospital-ward.jpg',
        puzzles: [
          {
            id: 'medicine-cabinet',
            type: 'pattern',
            description: 'A locked medicine cabinet with a pattern lock. The correct sequence will unlock it.',
            hint: 'The pattern matches the constellation diagram in Patient #137\'s file - connect the stars in the right order.',
            solved: false,
            requiredItems: ['patient-file'],
            solution: ['top-left', 'center', 'bottom-right', 'bottom-left', 'top-right'],
          }
        ],
        items: [
          {
            id: 'strange-syringe',
            name: 'Experimental Serum',
            description: 'A syringe containing a glowing blue substance. The label indicates it\'s part of "Project Ascension".',
            imageUrl: '/assets/items/syringe.png',
            isUsable: true,
          },
          {
            id: 'patient-journal',
            name: 'Patient\'s Journal',
            description: 'A handwritten journal from Patient #137, describing strange procedures and developing abilities.',
            imageUrl: '/assets/items/patient-journal.png',
            isUsable: true,
          }
        ],
        hunts: [
          {
            id: 'hidden-message-ward',
            description: 'There are scratches on the wall behind one of the beds that form a message when viewed from the right angle.',
            completed: false,
            reward: {
              id: 'lab-access-code',
              name: 'Laboratory Access Code',
              description: 'A sequence of numbers scratched into the wall by a patient, apparently the code to the restricted laboratory.',
              imageUrl: '/assets/items/lab-code.png',
              isUsable: true,
            }
          }
        ],
        isLocked: true,
        requiredKeyId: 'reception-keycard',
        isCompleted: false,
      },
      {
        id: 'hospital-lab',
        name: 'Research Laboratory',
        description: 'A sophisticated laboratory with advanced equipment, seemingly more modern than the rest of the hospital. Specimen containers line the walls.',
        backgroundImage: '/assets/rooms/hospital-lab.jpg',
        puzzles: [
          {
            id: 'security-system',
            type: 'combination',
            description: 'A security system protecting research files. It requires both a keycard and a numerical code.',
            hint: 'The code is related to the patient numbers mentioned in the journal - look for a pattern.',
            solved: false,
            requiredItems: ['lab-access-code', 'reception-keycard'],
            solution: '137-255-418',
          },
          {
            id: 'chemical-synthesis',
            type: 'sequence',
            description: 'A chemical synthesis machine that needs to be properly configured to create a stabilizing agent.',
            hint: 'The formula in the research notes indicates the correct sequence of chemical compounds.',
            solved: false,
            requiredItems: ['research-documents'],
            solution: ['hydrogen', 'carbon', 'nitrogen', 'oxygen', 'phosphorus'],
          }
        ],
        items: [
          {
            id: 'research-documents',
            name: 'Classified Research',
            description: 'Top-secret documents detailing experiments combining the manor owner\'s findings with new pharmaceutical compounds.',
            imageUrl: '/assets/items/research-documents.png',
            isUsable: true,
          },
          {
            id: 'director-keycard',
            name: 'Director\'s Keycard',
            description: 'A high-security clearance keycard belonging to the hospital director.',
            imageUrl: '/assets/items/director-keycard.png',
            isKey: true,
            isUsable: true,
          }
        ],
        hunts: [
          {
            id: 'hidden-compartment-lab',
            description: 'One of the specimen containers sounds hollow when tapped. Investigate what might be hidden inside.',
            completed: false,
            reward: {
              id: 'formula-component',
              name: 'Critical Formula Component',
              description: 'A rare compound necessary for completing the experimental serum, hidden to prevent unauthorized use.',
              imageUrl: '/assets/items/formula-component.png',
              isUsable: true,
              canCombine: true,
              combinesWith: ['strange-syringe'],
            }
          }
        ],
        isLocked: true,
        requiredKeyId: 'lab-access-code',
        isCompleted: false,
      },
      {
        id: 'hospital-directors-office',
        name: 'Director\'s Office',
        description: 'An opulent office contrasting with the decay of the rest of the hospital. Expensive furnishings and personal items suggest the director continued using this space long after the hospital officially closed.',
        backgroundImage: '/assets/rooms/hospital-office.jpg',
        puzzles: [
          {
            id: 'hidden-vault',
            type: 'riddle',
            description: 'A hidden vault behind a painting requires answering a riddle to open.',
            hint: 'The riddle relates to the director\'s philosophy as mentioned in the research documents - "What is given by nature but enhanced by science?"',
            solved: false,
            requiredItems: ['research-documents'],
            solution: 'MIND',
          },
          {
            id: 'computer-encryption',
            type: 'pattern',
            description: 'The director\'s computer is encrypted with a pattern lock based on a neural network diagram.',
            hint: 'The pattern resembles brain activity patterns shown in the classified research.',
            solved: false,
            requiredItems: ['research-documents'],
            solution: ['frontal-lobe', 'temporal-lobe', 'occipital-lobe', 'parietal-lobe', 'cerebellum'],
          }
        ],
        items: [
          {
            id: 'conspiracy-evidence',
            name: 'Conspiracy Evidence',
            description: 'Documents and photographs linking the hospital experiments to government officials and powerful corporations.',
            imageUrl: '/assets/items/conspiracy-evidence.png',
            isUsable: true,
          },
          {
            id: 'strange-artifact',
            name: 'Unknown Artifact',
            description: 'A strange device of unknown origin that seems to pulse with energy similar to the crystal found in the manor.',
            imageUrl: '/assets/items/strange-artifact.png',
            isUsable: true,
          }
        ],
        hunts: [
          {
            id: 'secret-escape',
            description: 'The director must have had an emergency escape route. Find the hidden passage out of the office.',
            completed: false,
            reward: {
              id: 'next-location',
              name: 'Next Investigation Location',
              description: 'Coordinates and details for a remote research facility where the final stage of Project Ascension is being conducted.',
              imageUrl: '/assets/items/next-location.png',
              isUsable: true,
            }
          }
        ],
        isLocked: true,
        requiredKeyId: 'director-keycard',
        completionText: 'Youve uncovered the connection between the manor experiments and this hospital. The director was working with a shadowy organization to perfect a serum that could enhance human abilities to supernatural levels. Your evidence could expose the entire operation, but the masterminds are still at large at a remote facility...',
        isCompleted: false,
      }
    ],
    isUnlocked: false,
    isCompleted: false,
  }
];

// Initial characters
export const gameCharacters = [
  {
    id: 'player',
    name: 'Detective',
    description: 'A private investigator with a knack for solving seemingly impossible cases. Your determination and observational skills are your greatest assets.',
    imageUrl: '/assets/characters/detective.png',
    dialogues: {
      intro: [
        "Another missing person case. The local police are baffled, but the pattern is clear to me.",
        "This manor has been at the center of too many disappearances to be coincidental.",
        "I need to find evidence of what's really happening here and put a stop to it."
      ],
      level1Completion: [
        "The experiments conducted here are disturbing beyond words.",
        "But this is just one piece of a larger puzzle. The research partner mentioned in these notes...",
        "I need to track them down to the abandoned hospital. The trail can't go cold now."
      ],
      level2Completion: [
        "The conspiracy runs deeper than I imagined. Government involvement, corporate funding...",
        "They're playing with forces they don't understand in the name of 'progress'.",
        "I have enough evidence to expose them now, but the real mastermind is still out there."
      ]
    }
  },
  {
    id: 'manor-owner',
    name: 'Dr. Victor Blackwood',
    description: 'The reclusive owner of the manor, once a respected scientist who disappeared under mysterious circumstances five years ago.',
    imageUrl: '/assets/characters/manor-owner.png',
    dialogues: {
      journal: [
        "Day 347: The conventional methods have failed. Science alone cannot achieve what I seek.",
        "The ancient texts speak of energies beyond our understanding. I have acquired a crystal that exhibits impossible properties.",
        "My colleagues would call this madness, but they lack vision. Immortality is within my grasp."
      ],
      recording: [
        "If you're hearing this, then you've discovered my work. Judge me if you must, but understand I pursued knowledge beyond boundaries.",
        "The disappearances were regrettable but necessary sacrifices. The crystal requires... life energy.",
        "I've succeeded in ways you cannot imagine. I am no longer bound by the limitations of flesh. I am... everywhere."
      ]
    }
  },
  {
    id: 'hospital-director',
    name: 'Dr. Eleanor Weiss',
    description: 'The former director of the psychiatric hospital, who continued secret research long after the facility was officially closed.',
    imageUrl: '/assets/characters/hospital-director.png',
    dialogues: {
      notes: [
        "Blackwood's breakthrough is remarkable, but his methods are crude. The crystal's properties can be enhanced pharmaceutically.",
        "Subject #137 shows the most promise. Cognitive function increased by 215%, with physical capabilities enhanced by 170%.",
        "Side effects remain problematic. Subjects experience hallucinations, paranoia, and eventually, complete dissociation from reality."
      ],
      computer: [
        "PROJECT ASCENSION - PHASE 2 COMPLETE",
        "We've successfully combined Blackwood's energetic principles with our pharmaceutical approach.",
        "The new serum allows for controlled enhancement without immediate psychological deterioration.",
        "Phase 3 will commence at the northern facility. All successful subjects are to be transferred immediately."
      ]
    }
  }
];

// Initial game state
export const initialGameState: GameState = {
  settings: {
    theme: 'dark',
    soundEnabled: true,
    musicVolume: 0.7,
    sfxVolume: 0.8,
  },
  player: {
    currentLevelId: null,
    currentRoomId: null,
    inventory: [],
    unlockedLevels: ['level1'],
    completedLevels: [],
    completedRooms: [],
    completedHunts: [],
    gameProgress: 0,
  },
  levels: gameLevels,
  characters: gameCharacters,
  storyProgress: 0,
  gameStarted: false,
  gameCompleted: false,
};
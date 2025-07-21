import { useState } from 'react';
import SimpleDice from './SimpleDice';

const RollInterface = ({ 
  diceCount, 
  diceSides, 
  selectedCustomDice, 
  onRoll 
}) => {
  const [results, setResults] = useState([]);
  const [isRolling, setIsRolling] = useState(false);
  const [revealedDice, setRevealedDice] = useState([]);
  const [lockedDice, setLockedDice] = useState([]);

  const rollDice = () => {
    // Don't allow rolling if all dice are locked (except on first roll)
    if (results.length > 0 && lockedDice.length === diceCount) {
      return;
    }
    
    setIsRolling(true);
    setRevealedDice([]);
    
    // If we have existing results, only re-roll unlocked dice
    const newResults = [...results];
    const dicesToRoll = [];
    
    for (let i = 0; i < diceCount; i++) {
      if (!lockedDice.includes(i) || results.length === 0) {
        dicesToRoll.push(i);
        
        // Generate new value for this die
        if (selectedCustomDice) {
          const randomIndex = Math.floor(Math.random() * selectedCustomDice.sides.length);
          newResults[i] = {
            value: randomIndex + 1,
            displayValue: selectedCustomDice.sides[randomIndex],
            isCustom: true,
            customValues: selectedCustomDice.sides
          };
        } else {
          newResults[i] = {
            value: Math.floor(Math.random() * diceSides) + 1,
            displayValue: Math.floor(Math.random() * diceSides) + 1,
            isCustom: false
          };
        }
      }
    }
    
    // If first roll, create all dice
    if (results.length === 0) {
      setResults(newResults.slice(0, diceCount));
      setLockedDice([]); // Clear locks on fresh roll
    } else {
      setResults(newResults);
    }
    
    // Reveal dice one by one (only the ones being rolled)
    setTimeout(() => {
      let rollIndex = 0;
      for (let i = 0; i < diceCount; i++) {
        if (dicesToRoll.includes(i)) {
          setTimeout(() => {
            setRevealedDice(prev => [...prev, i]);
            rollIndex++;
            
            // If this is the last die being rolled, finish rolling
            if (rollIndex === dicesToRoll.length) {
              setTimeout(() => {
                setIsRolling(false);
                
                if (onRoll) {
                  onRoll({
                    results: newResults.slice(0, diceCount),
                    timestamp: new Date().toISOString(),
                    diceType: selectedCustomDice ? selectedCustomDice.name : `${diceCount}d${diceSides}`
                  });
                }
              }, 200);
            }
          }, rollIndex * 150 + 800);
        } else {
          // For locked dice, reveal immediately
          setRevealedDice(prev => [...prev, i]);
        }
      }
    }, 100);
  };

  const toggleDiceLock = (index) => {
    if (isRolling) return; // Can't lock during rolling
    
    setLockedDice(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* Main Dice Rolling Area - Fixed height container */}
      <div className="mb-8">
        {/* Roll Button */}
        <div className="mb-8 mt-4">
          <button
            onClick={rollDice}
            disabled={isRolling || (results.length > 0 && lockedDice.length === diceCount)}
            className="group relative w-80 py-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold text-2xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 disabled:scale-100 disabled:opacity-70 transition-all duration-500 border-4 border-white/30 hover:border-white/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10 drop-shadow-lg">
              {isRolling ? 'Kaster...' : 'KAST TERNINGER'}
            </span>
          </button>
        </div>

        {/* Fixed height dice results container */}
        <div className="bg-gradient-to-r from-indigo-900/50 via-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20 shadow-2xl min-h-[320px] flex flex-col justify-center">
          {(isRolling || results.length > 0) ? (
            <>
              
              {/* Adaptive dice area layout */}
              <div className={`gap-4 justify-items-center min-h-[120px] items-center mx-auto ${
                diceCount === 1 
                  ? 'flex justify-center' 
                  : diceCount === 2 
                  ? 'flex justify-center gap-8' 
                  : diceCount === 4 
                  ? 'grid grid-cols-2 max-w-xs gap-6' 
                  : 'grid grid-cols-3 max-w-xs sm:max-w-md sm:gap-6'
              }`}>
                {isRolling ? (
                  // Show loading dice while rolling (only for unlocked dice)
                  Array.from({ length: diceCount }).map((_, index) => (
                    lockedDice.includes(index) ? (
                      // Show locked dice normally during rolling
                      <div 
                        key={index}
                        className="relative cursor-pointer"
                      >
                        <SimpleDice
                          value={results[index]?.value || 1}
                          sides={selectedCustomDice ? selectedCustomDice.sides.length : diceSides}
                          customValues={results[index]?.customValues}
                          index={index}
                          diceCount={diceCount}
                        />
                        {/* Lock indicator */}
                        <div className="absolute inset-0 bg-red-500/30 rounded-xl border-2 border-red-400"></div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-sm"></div>
                        </div>
                      </div>
                    ) : (
                      // Show question mark for unlocked dice being rolled
                      <div
                        key={index}
                        className={`${diceCount <= 2 ? 'w-24 h-24' : 'w-20 h-20'} bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center shadow-2xl border-2 border-white/20 animate-pulse`}
                      >
                        <div className={`${diceCount <= 2 ? 'text-4xl' : 'text-3xl'} font-bold text-white animate-bounce`} style={{ animationDelay: `${index * 100}ms` }}>
                          ?
                        </div>
                      </div>
                    )
                  ))
                ) : (
                  // Show revealed dice results
                  results.map((result, index) => (
                    <div 
                      key={index}
                      className={`relative transition-all duration-500 transform cursor-pointer ${
                        revealedDice.includes(index) 
                          ? 'scale-100 opacity-100' 
                          : 'scale-50 opacity-0'
                      }`}
                      onClick={() => toggleDiceLock(index)}
                    >
                      <SimpleDice
                        value={result.value}
                        sides={selectedCustomDice ? selectedCustomDice.sides.length : diceSides}
                        customValues={result.customValues}
                        index={index}
                        diceCount={diceCount}
                      />
                      
                      {/* Lock indicator */}
                      {lockedDice.includes(index) && (
                        <>
                          <div className="absolute inset-0 bg-red-500/30 rounded-xl border-2 border-red-400"></div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-sm"></div>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
              
            </>
          ) : (
            // Initial state
            <div className="flex flex-col items-center justify-center text-white/70">
              <div className="text-6xl mb-4">🎲</div>
              <div className="text-xl">Klikk for å kaste terninger</div>
            </div>
          )}
        </div>
      </div>

      {/* Compact settings info */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
        <div className="flex justify-center items-center space-x-4 text-white/60 text-xs">
          <span>{diceCount} terninger</span>
          <span>×</span>
          <span>{selectedCustomDice ? selectedCustomDice.name : `d${diceSides}`}</span>
        </div>
      </div>
    </div>
  );
};

export default RollInterface;
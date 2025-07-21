import { useState } from 'react';

const DiceSettings = ({ 
  diceCount, 
  setDiceCount, 
  diceSides, 
  setDiceSides, 
  selectedCustomDice, 
  setSelectedCustomDice, 
  savedDice 
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          ⚙️ Terning Innstillinger
        </h2>
        
        <div className="space-y-8">
          {/* Dice Count */}
          <div className="space-y-4">
            <label className="block text-xl font-semibold text-white">
              🎲 Antall terninger
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDiceCount(Math.max(1, diceCount - 1))}
                className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
              >
                -
              </button>
              <div className="flex-1 text-center">
                <div className="text-4xl font-bold text-white bg-white/10 rounded-2xl py-4">
                  {diceCount}
                </div>
              </div>
              <button
                onClick={() => setDiceCount(Math.min(12, diceCount + 1))}
                className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
              >
                +
              </button>
            </div>
            <div className="text-center text-white/70">
              (1-12 terninger)
            </div>
          </div>

          {/* Dice Type Selection */}
          <div className="space-y-4">
            <label className="block text-xl font-semibold text-white">
              🎯 Type terning
            </label>
            
            {/* Standard dice */}
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="standard"
                  name="diceType"
                  checked={!selectedCustomDice}
                  onChange={() => setSelectedCustomDice(null)}
                  className="w-5 h-5 text-purple-600"
                />
                <label htmlFor="standard" className="ml-3 text-white font-medium">
                  Standard terninger
                </label>
              </div>
              
              {!selectedCustomDice && (
                <div className="ml-8 grid grid-cols-4 gap-3">
                  {[4, 6, 8, 10, 12, 20, 100].map((sides) => (
                    <button
                      key={sides}
                      onClick={() => setDiceSides(sides)}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                        diceSides === sides
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                          : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                      }`}
                    >
                      d{sides}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Custom dice */}
            {savedDice && savedDice.length > 0 && (
              <div className="space-y-3">
                <div className="text-white font-medium">Egendefinerte terninger:</div>
                <div className="space-y-2">
                  {savedDice.map((dice) => (
                    <div key={dice.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`custom-${dice.id}`}
                        name="diceType"
                        checked={selectedCustomDice?.id === dice.id}
                        onChange={() => setSelectedCustomDice(dice)}
                        className="w-5 h-5 text-purple-600"
                      />
                      <label htmlFor={`custom-${dice.id}`} className="ml-3 text-white">
                        <div className="font-medium">{dice.name}</div>
                        <div className="text-sm text-white/70">
                          {dice.sides.length} sider: {dice.sides.slice(0, 3).join(', ')}
                          {dice.sides.length > 3 && '...'}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiceSettings;
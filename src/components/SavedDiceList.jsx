import { useState } from 'react';

const SavedDiceList = ({ savedDice, onSelect, onEdit, onDelete, selectedDice }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  const handleDelete = (diceId) => {
    onDelete(diceId);
    setShowConfirmDelete(null);
  };

  if (!savedDice || savedDice.length === 0) {
    return (
      <div className="p-6 bg-white/20 backdrop-blur-sm rounded-2xl text-white/70 text-center border border-white/30">
        <div className="text-4xl mb-2">🎲</div>
        <div>Ingen lagrede terninger ennå</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white text-center">💎 Lagrede terninger</h3>
      
      {savedDice.map((dice) => (
        <div
          key={dice.id}
          className={`p-4 border rounded-2xl transition-all duration-300 ${
            selectedDice?.id === dice.id 
              ? 'border-yellow-400 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 shadow-lg scale-105' 
              : 'border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-white">{dice.name}</h4>
              <p className="text-sm text-white/70">
                {dice.sides.length} sider: {dice.sides.slice(0, 3).join(', ')}
                {dice.sides.length > 3 && '...'}
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => onSelect(dice)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  selectedDice?.id === dice.id
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                    : 'bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:shadow-lg hover:scale-105'
                }`}
              >
                {selectedDice?.id === dice.id ? '✓ Valgt' : '🎯 Velg'}
              </button>
              
              <button
                onClick={() => onEdit(dice)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-400 to-blue-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                ✏️ Rediger
              </button>
              
              {showConfirmDelete === dice.id ? (
                <div className="flex gap-1">
                  <button
                    onClick={() => handleDelete(dice.id)}
                    className="px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-xs font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    ✓ Ja
                  </button>
                  <button
                    onClick={() => setShowConfirmDelete(null)}
                    className="px-3 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl text-xs font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    ✗ Nei
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowConfirmDelete(dice.id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  🗑️ Slett
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedDiceList;
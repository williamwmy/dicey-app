import { useState } from 'react';

const CustomDiceEditor = ({ onSave, onCancel, existingDice = null }) => {
  const [diceName, setDiceName] = useState(existingDice?.name || '');
  const [sides, setSides] = useState(existingDice?.sides || ['1', '2', '3', '4', '5', '6']);

  const addSide = () => {
    setSides([...sides, '']);
  };

  const removeSide = (index) => {
    if (sides.length > 1) {
      setSides(sides.filter((_, i) => i !== index));
    }
  };

  const updateSide = (index, value) => {
    const newSides = [...sides];
    newSides[index] = value;
    setSides(newSides);
  };

  const handleSave = () => {
    if (!diceName.trim()) {
      alert('Vennligst skriv inn et navn for terningen');
      return;
    }
    
    if (sides.some(side => !side.trim())) {
      alert('Alle sider må ha en verdi');
      return;
    }

    const customDice = {
      id: existingDice?.id || Date.now().toString(),
      name: diceName.trim(),
      sides: sides.map(side => side.trim()),
      created: existingDice?.created || new Date().toISOString()
    };

    onSave(customDice);
  };

  return (
    <div className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
        {existingDice ? '✏️ Rediger terning' : '✨ Lag ny terning'}
      </h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Navn på terning
        </label>
        <input
          type="text"
          value={diceName}
          onChange={(e) => setDiceName(e.target.value)}
          placeholder="F.eks. 'Spesiell d6'"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sider (verdier)
        </label>
        <div className="space-y-2">
          {sides.map((side, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-sm text-gray-500 w-12">
                Side {index + 1}:
              </span>
              <input
                type="text"
                value={side}
                onChange={(e) => updateSide(index, e.target.value)}
                placeholder="Verdi"
                className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {sides.length > 1 && (
                <button
                  onClick={() => removeSide(index)}
                  className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        
        <button
          onClick={addSide}
          className="mt-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded border border-blue-300"
        >
          + Legg til side
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          💾 Lagre terning
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          ❌ Avbryt
        </button>
      </div>
    </div>
  );
};

export default CustomDiceEditor;
import { useState, useEffect } from 'react';
import RollInterface from './components/RollInterface';
import DiceSettings from './components/DiceSettings';
import CustomDiceEditor from './components/CustomDiceEditor';
import SavedDiceList from './components/SavedDiceList';
import HistoryLog from './components/HistoryLog';

function App() {
  const [savedDice, setSavedDice] = useState([]);
  const [rollHistory, setRollHistory] = useState([]);
  const [selectedCustomDice, setSelectedCustomDice] = useState(null);
  const [showCustomEditor, setShowCustomEditor] = useState(false);
  const [editingDice, setEditingDice] = useState(null);
  const [activeTab, setActiveTab] = useState('roll');
  
  // Dice settings
  const [diceCount, setDiceCount] = useState(2);
  const [diceSides, setDiceSides] = useState(6);

  useEffect(() => {
    const storedDice = localStorage.getItem('dicey-saved-dice');
    const storedHistory = localStorage.getItem('dicey-roll-history');
    
    if (storedDice) {
      try {
        setSavedDice(JSON.parse(storedDice));
      } catch (error) {
        console.error('Error loading saved dice:', error);
      }
    }
    
    if (storedHistory) {
      try {
        setRollHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.error('Error loading roll history:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dicey-saved-dice', JSON.stringify(savedDice));
  }, [savedDice]);

  useEffect(() => {
    localStorage.setItem('dicey-roll-history', JSON.stringify(rollHistory));
  }, [rollHistory]);

  const handleRoll = (rollResult) => {
    setRollHistory(prev => [rollResult, ...prev].slice(0, 12));
  };

  const handleSaveCustomDice = (customDice) => {
    if (editingDice) {
      setSavedDice(prev => prev.map(dice => 
        dice.id === customDice.id ? customDice : dice
      ));
      setEditingDice(null);
    } else {
      setSavedDice(prev => [...prev, customDice]);
    }
    setShowCustomEditor(false);
  };

  const handleEditDice = (dice) => {
    setEditingDice(dice);
    setShowCustomEditor(true);
  };

  const handleDeleteDice = (diceId) => {
    setSavedDice(prev => prev.filter(dice => dice.id !== diceId));
    if (selectedCustomDice?.id === diceId) {
      setSelectedCustomDice(null);
    }
  };

  const handleSelectCustomDice = (dice) => {
    setSelectedCustomDice(selectedCustomDice?.id === dice.id ? null : dice);
  };

  const clearHistory = () => {
    setRollHistory([]);
  };

  const version = "1.3.0";

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-4 max-w-6xl h-full flex flex-col">
        <header className="text-center mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            🎲 Dicey
          </h1>
        </header>

        <div className="mb-4 flex-shrink-0">
          <div className="flex justify-center bg-white/10 backdrop-blur-sm rounded-full p-1 max-w-sm mx-auto overflow-hidden">
            <button
              onClick={() => setActiveTab('roll')}
              className={`px-3 py-2 font-semibold rounded-full transition-all duration-300 text-sm ${
                activeTab === 'roll'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              🎯 Kast
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-2 font-semibold rounded-full transition-all duration-300 text-sm ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              ⚙️ Innstillinger
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-3 py-2 font-semibold rounded-full transition-all duration-300 text-sm ${
                activeTab === 'custom'
                  ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              🎨 Egne
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-2 font-semibold rounded-full transition-all duration-300 text-sm ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              📜 Historikk
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'roll' && (
            <RollInterface
              diceCount={diceCount}
              diceSides={diceSides}
              selectedCustomDice={selectedCustomDice}
              onRoll={handleRoll}
            />
          )}

          {activeTab === 'settings' && (
            <DiceSettings
              diceCount={diceCount}
              setDiceCount={setDiceCount}
              diceSides={diceSides}
              setDiceSides={setDiceSides}
              selectedCustomDice={selectedCustomDice}
              setSelectedCustomDice={setSelectedCustomDice}
              savedDice={savedDice}
            />
          )}

          {activeTab === 'custom' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  🎨 Egendefinerte Terninger
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    {showCustomEditor ? (
                      <CustomDiceEditor
                        onSave={handleSaveCustomDice}
                        onCancel={() => {
                          setShowCustomEditor(false);
                          setEditingDice(null);
                        }}
                        existingDice={editingDice}
                      />
                    ) : (
                      <div className="text-center">
                        <button
                          onClick={() => setShowCustomEditor(true)}
                          className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                          ✨ Lag ny terning
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <SavedDiceList
                      savedDice={savedDice}
                      onSelect={handleSelectCustomDice}
                      onEdit={handleEditDice}
                      onDelete={handleDeleteDice}
                      selectedDice={selectedCustomDice}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  📜 Kasthistorikk
                </h2>
                <HistoryLog
                  history={rollHistory}
                  onClear={clearHistory}
                />
              </div>
            </div>
          )}
        </div>

        <footer className="fixed bottom-4 right-4 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-xs text-white/60 font-medium">
          ✨ v{version}
        </footer>
      </div>
    </div>
  );
}

export default App;

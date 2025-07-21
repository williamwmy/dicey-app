import { useState } from 'react';

const HistoryLog = ({ history, onClear }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!history || history.length === 0) {
    return (
      <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl text-white text-center border border-white/30">
        <div className="text-6xl mb-4">📜</div>
        <div className="text-xl font-semibold">Ingen kasthistorikk ennå</div>
        <div className="text-white/70 mt-2">Kast noen terninger for å se historikk her!</div>
      </div>
    );
  }

  const displayHistory = isExpanded ? history : history.slice(0, 5);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('no-NO', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="mx-auto px-6 py-3 bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            🗑️ Tøm historikk
          </button>
        )}
      </div>

      <div className="space-y-4">
        {displayHistory.map((entry, index) => (
          <div
            key={index}
            className="p-6 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-white">
                🎲 {entry.diceType}
              </span>
              <span className="text-sm text-white/70 bg-white/10 px-3 py-1 rounded-full">
                {formatTimestamp(entry.timestamp)}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {entry.results.map((result, resultIndex) => (
                <div
                  key={resultIndex}
                  className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white/30 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-lg"
                >
                  {result.isCustom ? result.displayValue : result.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {history.length > 5 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-4 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          {isExpanded ? '⬆️ Vis mindre' : `⬇️ Vis alle ${history.length} kast`}
        </button>
      )}
    </div>
  );
};

export default HistoryLog;
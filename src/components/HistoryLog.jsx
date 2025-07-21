import { useState } from 'react';

const HistoryLog = ({ history, onClear }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil((history?.length || 0) / itemsPerPage);

  if (!history || history.length === 0) {
    return (
      <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl text-white text-center border border-white/30">
        <div className="text-6xl mb-4">📜</div>
        <div className="text-xl font-semibold">Ingen kasthistorikk ennå</div>
        <div className="text-white/70 mt-2">Kast noen terninger for å se historikk her!</div>
      </div>
    );
  }

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEntries = history.slice(startIndex, endIndex);

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

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Clear button */}
      <div className="flex justify-center flex-shrink-0">
        <button
          onClick={onClear}
          className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 text-sm"
        >
          🗑️ Tøm historikk
        </button>
      </div>

      {/* History entries */}
      <div className="flex-1 space-y-3">
        {currentEntries.map((entry, index) => (
          <div
            key={startIndex + index}
            className="p-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white">
                🎲 {entry.diceType}
              </span>
              <span className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded-full">
                {formatTimestamp(entry.timestamp)}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {entry.results.map((result, resultIndex) => (
                <div
                  key={resultIndex}
                  className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 border border-white/30 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-lg"
                >
                  {result.isCustom ? result.displayValue : result.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between flex-shrink-0">
          <button
            onClick={goToPrevPage}
            className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            ←
          </button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage 
                    ? 'bg-white' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={goToNextPage}
            className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryLog;
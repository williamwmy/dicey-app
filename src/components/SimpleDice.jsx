const SimpleDice = ({ value, sides = 6, customValues = null, index = 0, diceCount = 2 }) => {
  const diceColors = [
    'from-red-400 to-red-600',
    'from-blue-400 to-blue-600', 
    'from-green-400 to-green-600',
    'from-purple-400 to-purple-600',
    'from-yellow-400 to-yellow-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600',
    'from-teal-400 to-teal-600'
  ];

  const diceColor = diceColors[index % diceColors.length];

  const getDiceDisplay = () => {
    if (customValues) {
      return customValues[value - 1] || value;
    }
    return value;
  };

  const getDiceDots = () => {
    // For custom values, always show the custom text/values
    if (customValues) {
      return (
        <div className={`${textSize} font-bold text-white drop-shadow-lg`}>
          {getDiceDisplay()}
        </div>
      );
    }

    // For standard D6 (6-sided dice), always show dots regardless of value
    if (sides === 6 && value >= 1 && value <= 6) {
      const dotPositions = {
        1: ['center'],
        2: ['top-left', 'bottom-right'],
        3: ['top-left', 'center', 'bottom-right'],
        4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
        6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
      };

      const positions = {
        'top-left': 'top-2 left-2',
        'top-right': 'top-2 right-2',
        'middle-left': 'top-1/2 left-2 transform -translate-y-1/2',
        'middle-right': 'top-1/2 right-2 transform -translate-y-1/2',
        'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        'bottom-left': 'bottom-2 left-2',
        'bottom-right': 'bottom-2 right-2'
      };

      return (
        <div className="relative w-full h-full">
          {dotPositions[value]?.map((position, dotIndex) => (
            <div
              key={dotIndex}
              className={`absolute ${dotSize} bg-white rounded-full shadow-lg ${positions[position]}`}
            />
          ))}
        </div>
      );
    }

    // For all other dice types (D4, D8, D10, D12, D20, D100), show numbers
    return (
      <div className={`${textSize} font-bold text-white drop-shadow-lg`}>
        {getDiceDisplay()}
      </div>
    );
  };

  // Larger dice for 1-2 dice
  const diceSize = (diceCount <= 2) ? 'w-24 h-24' : 'w-20 h-20';
  const textSize = (diceCount <= 2) ? 'text-3xl' : 'text-2xl';
  const dotSize = (diceCount <= 2) ? 'w-4 h-4' : 'w-3 h-3';

  return (
    <div className={`
      ${diceSize} bg-gradient-to-br ${diceColor} rounded-xl 
      flex items-center justify-center shadow-2xl border-2 border-white/20
      hover:shadow-3xl hover:scale-105 transition-all duration-300
    `}>
      <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
      <div className="relative z-10">
        {getDiceDots()}
      </div>
    </div>
  );
};

export default SimpleDice;
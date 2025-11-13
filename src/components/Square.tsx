import React from 'react';

interface SquareProps {
  value: 'X' | 'O' | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  const textClass = value === 'X' ? 'text-blue-500' : 'text-red-500';

  return (
    <button
      className={`w-24 h-24 md:w-28 md:h-28 bg-white flex items-center justify-center text-5xl md:text-6xl font-bold rounded-lg shadow-md transition-all duration-200 ease-in-out
      ${textClass}
      ${!value ? 'hover:bg-gray-100 hover:scale-105' : 'cursor-not-allowed scale-100'}`}
      onClick={onClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
};

export default Square;

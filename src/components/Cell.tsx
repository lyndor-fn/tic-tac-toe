import React from 'react';
import Piece from './Piece';

interface CellProps {
  isBlack: boolean;
  piece: { player: 'red' | 'black'; isKing: boolean } | null;
  isSelected: boolean;
  isPossibleMove: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ isBlack, piece, isSelected, isPossibleMove, onClick }) => {
  const bgColor = isBlack ? 'bg-gray-700' : 'bg-gray-300';
  const selectionColor = isSelected ? 'ring-4 ring-yellow-400' : '';
  const moveIndicator = isPossibleMove ? 'bg-green-400 opacity-50' : '';

  return (
    <div
      className={`w-12 h-12 ${bgColor} flex items-center justify-center relative ${selectionColor}`}
      onClick={onClick}
    >
      {moveIndicator && <div className={`absolute w-full h-full ${moveIndicator}`} />} 
      {piece && <Piece player={piece.player} isKing={piece.isKing} />}
    </div>
  );
};

export default Cell;
import React from 'react';

interface PieceProps {
  player: 'red' | 'black';
  isKing: boolean;
}

const Piece: React.FC<PieceProps> = ({ player, isKing }) => {
  const pieceColor = player === 'red' ? 'bg-red-500' : 'bg-black';
  const kingIcon = isKing ? '👑' : '';

  return (
    <div className={`w-10 h-10 rounded-full ${pieceColor} flex items-center justify-center`}>
      <span className="text-2xl">{kingIcon}</span>
    </div>
  );
};

export default Piece;
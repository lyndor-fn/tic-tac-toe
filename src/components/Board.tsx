import React from 'react';
import Square from './Square';

interface BoardProps {
  squares: ('X' | 'O' | null)[];
  onPlay: (i: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onPlay }) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-3 bg-gray-200 rounded-xl">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onPlay(i)} />
      ))}
    </div>
  );
};

export default Board;

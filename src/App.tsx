import { useState } from 'react';
import Board from './components/Board';
import { calculateWinner } from './utils/gameLogic';
import { Toaster, toast } from 'sonner';

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);

  const handlePlay = (i: number) => {
    if (board[i] || winner) {
      return;
    }

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    toast.success('New game started!');
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <main className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 font-sans">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Akili Tic-Tac-Toe</h1>
          <p className="text-gray-600 text-lg">The classic game of wits. Can you win?</p>
        </div>

        <div className="relative shadow-2xl rounded-lg">
          <Board squares={board} onPlay={handlePlay} />
        </div>

        <div className="text-center mt-8">
          <div className="text-2xl font-semibold text-gray-700 mb-4 h-8">{status}</div>
          <button
            onClick={handleRestart}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 duration-300"
          >
            Restart Game
          </button>
        </div>
      </main>
    </>
  );
}

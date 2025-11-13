import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { BOARD_SIZE, initialBoard } from '../utils/checkerLogic';
import Cell from './Cell';

const Checkerboard: React.FC = () => {
  const [board, setBoard] = useState(initialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<'red' | 'black'>('red');
  const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<{ row: number; col: number }[]>([]);
  const [winner, setWinner] = useState<'red' | 'black' | null>(null);

  const getPossibleMoves = (row: number, col: number) => {
    const piece = board[row][col];
    if (!piece) return [];

    const moves: { row: number; col: number }[] = [];
    const captures: { row: number; col: number }[] = [];
    const directions = piece.isKing
      ? [{ dr: -1, dc: -1 }, { dr: -1, dc: 1 }, { dr: 1, dc: -1 }, { dr: 1, dc: 1 }]
      : piece.player === 'red' ? [{ dr: -1, dc: -1 }, { dr: -1, dc: 1 }] : [{ dr: 1, dc: -1 }, { dr: 1, dc: 1 }];

    for (const { dr, dc } of directions) {
      let r = row + dr;
      let c = col + dc;

      if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
        if (!board[r][c]) {
          moves.push({ row: r, col: c });
        } else if (board[r][c]?.player !== currentPlayer) {
          let jumpR = r + dr;
          let jumpC = c + dc;
          if (jumpR >= 0 && jumpR < BOARD_SIZE && jumpC >= 0 && jumpC < BOARD_SIZE && !board[jumpR][jumpC]) {
            captures.push({ row: jumpR, col: jumpC });
          }
        }
      }
    }
    return captures.length > 0 ? captures : moves;
  };

  const handleCellClick = (row: number, col: number) => {
    if (winner) return;

    if (selectedPiece && possibleMoves.some(move => move.row === row && move.col === col)) {
      movePiece(selectedPiece, { row, col });
    } else if (board[row][col] && board[row][col]?.player === currentPlayer) {
      const newPossibleMoves = getPossibleMoves(row, col);
      setSelectedPiece({ row, col });
      setPossibleMoves(newPossibleMoves);
    } else {
      setSelectedPiece(null);
      setPossibleMoves([]);
    }
  };

  const movePiece = (from: { row: number; col: number }, to: { row: number; col: number }) => {
    const newBoard = board.map(r => [...r]);
    const piece = newBoard[from.row][from.col];
    newBoard[to.row][to.col] = piece;
    newBoard[from.row][from.col] = null;

    if (Math.abs(from.row - to.row) === 2) {
      const capturedRow = from.row + (to.row - from.row) / 2;
      const capturedCol = from.col + (to.col - from.col) / 2;
      newBoard[capturedRow][capturedCol] = null;
      toast.success(`${currentPlayer === 'red' ? 'Rouge' : 'Noir'} a capturé une pièce!`);
    }

    if ((to.row === 0 && piece?.player === 'red') || (to.row === BOARD_SIZE - 1 && piece?.player === 'black')) {
      if(piece) piece.isKing = true;
      toast.info(`Une pièce ${currentPlayer === 'red' ? 'rouge' : 'noire'} est devenue roi!`);
    }

    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'red' ? 'black' : 'red');
    setSelectedPiece(null);
    setPossibleMoves([]);
  };

  useEffect(() => {
    const redPieces = board.flat().filter(p => p?.player === 'red').length;
    const blackPieces = board.flat().filter(p => p?.player === 'black').length;

    if (redPieces === 0) setWinner('black');
    if (blackPieces === 0) setWinner('red');
  }, [board]);

  const restartGame = () => {
    setBoard(initialBoard());
    setCurrentPlayer('red');
    setSelectedPiece(null);
    setPossibleMoves([]);
    setWinner(null);
    toast.success('Le jeu a été réinitialisé!');
  };

  return (
    <div className="flex flex-col items-center">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
            <div className="grid grid-cols-8 gap-0">
                {board.map((row, rowIndex) =>
                    row.map((piece, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            isBlack={(rowIndex + colIndex) % 2 !== 0}
                            piece={piece}
                            isSelected={selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex}
                            isPossibleMove={possibleMoves.some(move => move.row === rowIndex && move.col === colIndex)}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                        />
                    ))
                )}
            </div>
        </div>
        <div className="text-center text-white">
            {winner ? (
                <div className="text-2xl font-bold mb-4">
                    {winner === 'red' ? 'Les rouges ont gagné!' : 'Les noirs ont gagné!'}
                </div>
            ) : (
                <div className="text-2xl font-bold mb-4">
                    Tour du joueur: {currentPlayer === 'red' ? 'Rouge' : 'Noir'}
                </div>
            )}
            <button
                onClick={restartGame}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
                Recommencer
            </button>
        </div>
    </div>
  );
};

export default Checkerboard;
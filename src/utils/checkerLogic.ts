export const BOARD_SIZE = 8;

export const initialBoard = () => {
  const board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if ((row + col) % 2 !== 0) {
        if (row < 3) {
          board[row][col] = { player: 'black', isKing: false };
        } else if (row > 4) {
          board[row][col] = { player: 'red', isKing: false };
        }
      }
    }
  }

  return board;
};
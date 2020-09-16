export const calculateWinner = (board) => {
  console.log(board);
  const winingCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //iterate array and check if winning combination has been met
  for (let i = 0; i < winingCombinations.length; i++) {
    const [pos1, pos2, pos3] = winingCombinations[i];
    if (
      board[pos1] &&
      board[pos1] === board[pos2] &&
      board[pos1] === board[pos3]
    )
      return board[pos1];
  }
  return null;
};

import React, { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [nextMove, setNextMove] = useState("X");

  const calculateWinner = (board) => {
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

  const winner = calculateWinner(board);

  const handleSquareClick = (idx) => {
    let copyBoard = [...board]; // create a copy array to update the state

    if (copyBoard[idx] || winner) return; // Check if square was already clicked or winner is already set
    copyBoard[idx] = nextMove; // update the copy array with move to make

    // Update state
    setNextMove(nextMove === "X" ? "O" : "X");
    setBoard(copyBoard);
  };

  const handleResetClick = () => {
    setNextMove("X");
    setBoard(Array(9).fill(null));
  };

  const getStatus = () => {
    if (winner) {
      return "Winner - " + winner;
    } else if (board.every((item) => item !== null)) {
      return "Draw Game";
    } else {
      return "Next Move - " + nextMove;
    }
  };

  return (
    <div className="container">
      <div className="board">
        {board.map((item, idx) => (
          <Square
            className="square"
            key={idx}
            value={item}
            onClick={() => handleSquareClick(idx)}
          />
        ))}
      </div>
      <div className="status">{getStatus()}</div>
      <button className="reset" onClick={() => handleResetClick()}>
        Reset Board
      </button>
    </div>
  );
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default App;

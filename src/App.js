import React, { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [nextMove, setNextMove] = useState("X");
  const [winner, setWinner] = useState(null);

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

  const handleSquareClick = (idx) => {
    let copyBoard = [...board]; // create a copy array to update and update state

    if (copyBoard[idx] || winner) return; // Check if square was already clicked or winner is already set
    copyBoard[idx] = nextMove; // update the copy array with move to make

    setWinner(calculateWinner(copyBoard)); // call the function to find if Winning move has been made and update state

    // Update state
    setNextMove(nextMove === "X" ? "O" : "X");
    setBoard(copyBoard);
  };

  const handleResetClick = () => {
    setNextMove("X");
    setBoard(Array(9).fill(null));
    setWinner(null);
  };

  return (
    <div className="container">
      <Board board={board} onClick={handleSquareClick}></Board>
      {winner ? (
        <div className="details">Winner - {winner} </div>
      ) : (
        <div className="details"> Next Move - {nextMove} </div>
      )}
      <button className="reset" onClick={() => handleResetClick()}>
        Reset Board
      </button>
    </div>
  );
}

function Board(props) {
  return (
    <div className="board">
      {props.board.map((item, idx) => (
        <Square
          className="square"
          key={idx}
          value={item}
          onClick={() => props.onClick(idx)}
        />
      ))}
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

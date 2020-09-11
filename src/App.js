import React, { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [nextMove, setNextMove] = useState("X");
  const [winner, setWinner] = useState(null);

  const handleSquareClick = (idx) => {
    let copyBoard = [...board];

    // Check if square was already clicked
    if (copyBoard[idx] || winner) return;

    // update the array with move to make
    copyBoard[idx] = nextMove;

    // call the function to find if Winning move has been made
    setWinner(calculateWinner(copyBoard));

    setNextMove(nextMove === "X" ? "O" : "X");
    setBoard(copyBoard);
  };

  const calculateWinner = (board) => {};

  const handleResetClick = () => {
    setNextMove("X");
    setBoard(Array(9).fill(null));
    setWinner(null);
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

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default App;

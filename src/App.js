import React, { useState } from "react";
import "./App.css";
import { calculateWinner } from "./helper";

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [nextMove, setNextMove] = useState("X");
  const winner = calculateWinner(history[stepNumber]);

  const handleSquareClick = (idx) => {
    //get a copy of all items in history array till current stepNumber to start newHistory if a new move has been made
    let historyToCurrentStep = history.slice(0, stepNumber + 1);

    // create a copy array to update the state at current Step
    let copyBoard = [...historyToCurrentStep[stepNumber]];

    // Check if square was already clicked or winner is already set
    if (copyBoard[idx] || winner) return;

    // update with move to make
    copyBoard[idx] = nextMove;

    //Update the state
    const newHistory = [...historyToCurrentStep, copyBoard];
    setHistory(newHistory);
    setNextMove(nextMove === "X" ? "O" : "X");
    setStepNumber(historyToCurrentStep.length);
  };

  const handleButtonClick = (step) => {
    setNextMove(step % 2 === 0 ? "X" : "O");
    setStepNumber(step);
  };

  const getStatus = () => {
    if (winner) {
      return "Winner - " + winner;
    } else if (history[stepNumber].every((item) => item !== null)) {
      return "Draw Game";
    } else {
      return "Next Move - " + nextMove;
    }
  };

  const renderMoveHistory = () =>
    history.map((board, step) => {
      const text = step ? "Go To Step " + step : "Go To Start";
      return (
        <li key={step}>
          <button className="reset" onClick={() => handleButtonClick(step)}>
            {text}
          </button>
        </li>
      );
    });

  return (
    <div className="container">
      <div className="board">
        {history[stepNumber].map((item, idx) => (
          <Square
            className="square"
            key={idx}
            value={item}
            onClick={() => handleSquareClick(idx)}
          />
        ))}
      </div>
      <div className="status">{getStatus()}</div>
      <div>{renderMoveHistory()}</div>
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

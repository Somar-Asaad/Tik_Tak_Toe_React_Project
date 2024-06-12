import Player from "./components/player";
import GameBox from "./components/GameBox";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combination";
import GameOver from "./components/GameOver";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(playerTurn) {
  let currentPlayer = "X";
  if (playerTurn.length > 0 && playerTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [playerTurn, setPlayerTurn] = useState([]);

  let activePlayer = deriveActivePlayer(playerTurn);

  let boxValue = [...initialGameBoard.map((array) => [...array])];
  for (const turn of playerTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    boxValue[row][col] = player;
  }

  let winner;
  let draw;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = boxValue[combination[0].row][combination[0].column];
    const secondSybmol = boxValue[combination[1].row][combination[1].column];
    const thirdSybmol = boxValue[combination[2].row][combination[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSybmol &&
      firstSymbol === thirdSybmol
    ) {
      winner = firstSymbol;
    }
  }

  draw = playerTurn.length === 9 && !winner ? true : false;

  function changePlayer(rowIndex, colIndex) {
    setPlayerTurn((prevTurn) => {
      let currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setPlayerTurn([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player playerName="Somar" symbol="X" activePlayer={activePlayer} />
          <Player playerName="Asaad" symbol="O" activePlayer={activePlayer} />
        </ol>
        <div>
          {(winner || draw) && <GameOver winner={winner} onRestart={handleRestart}/>}
          <GameBox board={boxValue} changePlayer={changePlayer} />
        </div>
      </div>
      <div>
        <Log playerTurn={playerTurn} />
      </div>
    </main>
  );
}

export default App;

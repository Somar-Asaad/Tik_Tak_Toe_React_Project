export default function Log({ playerTurn }) {
  const turnsList = playerTurn;

  return (
    <>
      <ol id="log">
        {turnsList.map((turn) => {
          return (
            <li key={`${turn.square.row} ${turn.square.col}`}>
              {turn.player} selected , {turn.square.row} , {turn.square.col}
            </li>
          );
        })}
      </ol>
    </>
  );
}

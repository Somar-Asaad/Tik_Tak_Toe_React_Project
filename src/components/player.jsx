import { useState } from "react";

export default function Player({ playerName, symbol, activePlayer }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(playerName);

  let editablePlayerName = <span className="player-name">{userName}</span>;

  function handleChange(event) {
    setUserName(event.target.value);
  }

  function handleEditClick() {
    console.log(isEditing);
    setIsEditing((editing) => !editing);
  }
  if (isEditing) {
    editablePlayerName = (
      <input type="text" value={userName} onChange={handleChange} />
    );
  }
  return (
    <li className={activePlayer === symbol ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

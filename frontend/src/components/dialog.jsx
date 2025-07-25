import { useState } from "react";
import "/styles/dialogWin.css";
export function Dialog ({isOpen, onClose, gameId,totalTime}) {
   const [error, setError]= useState(null)
   console.log(gameId)
  if (!isOpen) return null;
  const handleSubmit = async (e)=>{
    e.preventDefault()
    const playerName = e.target.playerName.value;
    if(!playerName){
      setError("Required field")
      return
    }
    fetch(`http://localhost:3000/${gameId}/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameId,
        score: totalTime,
        username: playerName
      })
    })
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>You finded them all</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="playerName">Enter your name:</label>
            <input type="text" id="playerName" name="playerName"/>
          </div>
          {error && <p>{error}</p>}
          <button type="submit">Save Score</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
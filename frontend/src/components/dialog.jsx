import { useState } from "react";
import "/styles/dialogWin.css";
import { useNavigate } from "react-router-dom";
export function Dialog ({isOpen, onClose, gameId,totalTime}) {
   const [error, setError]= useState(null)
   const navigate = useNavigate()
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
    navigate(`/${gameId}/leaderboard`)
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>You finded them all</h2>
        <form id="saveScoreForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="playerName">Enter your name:</label>
            <input type="text" id="playerName" name="playerName"/>
          </div>
          {error && <p>{error}</p>}
          
        </form>
        <div className="buttonsContainer">
          <button form="saveScoreForm" type="submit">Save Score</button>
          <button onClick={onClose}>Exit</button>
        </div>

      </div>
    </div>
  );
}
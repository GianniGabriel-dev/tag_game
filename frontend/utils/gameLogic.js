const playCorrectSound = () =>{
  const sound= new Audio("correct.mp3")
  sound.volume = 0.7
  sound.play()
}
export const checkIfCharacterFound = (xClick, yClick, fetchedData, foundCharacters, setFoundCharacters, setMessage, setMessageClass, tolerance) => {
  for (const character of fetchedData.gameData) {
    const isXMatch = Math.abs(xClick - parseFloat(character.x)) <= tolerance;
    const isYMatch = Math.abs(yClick - parseFloat(character.y)) <= tolerance;

    if (isXMatch && isYMatch && !foundCharacters.includes(character.character_name)) {
      playCorrectSound()
      setMessage(`You have found the ${character.character_name}! ✅`);
      setMessageClass("correct")
      setFoundCharacters(prev => [...prev, character.character_name]);
      return;
    }
  }

  setMessage("Nothing here... 😅");
  setMessageClass("incorrect")
};
export const startGame = async (gameId) => {
  try {
    const response = await fetch(`http://localhost:3000/${gameId}/start`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while starting the game:", error);
    return null; 
  }
};

export const endGame = async (gameId) => {
  try {
    const response = await fetch(`http://localhost:3000/${gameId}/end`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("End game response:", data);
    return data;
  } catch (error) {
    console.error("Error while ending the game:", error);
    return null; 
  }
};

function timeStringToSeconds(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export const getTotalTime = (start, end)=>{
  const startSeconds = timeStringToSeconds(start);
  const endSeconds = timeStringToSeconds(end);
  //si durante el  juego se llega a las 00:00:00 se añade 24 horas al tiempo final para que no de negativo el total
  if (endSeconds < startSeconds) {
    return (24 * 3600 - startSeconds) + endSeconds;
  }
  return endSeconds - startSeconds
  
}
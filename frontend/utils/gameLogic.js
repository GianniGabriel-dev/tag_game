export const checkIfCharacterFound = (xClick, yClick, fetchedData, foundCharacters, setFoundCharacters, setMessage, tolerance) => {
  for (const character of fetchedData.gameData) {
    const isXMatch = Math.abs(xClick - parseFloat(character.x)) <= tolerance;
    const isYMatch = Math.abs(yClick - parseFloat(character.y)) <= tolerance;

    if (isXMatch && isYMatch && !foundCharacters.includes(character.character_name)) {
      setMessage(`¡Has encontrado a ${character.character_name}! ✅`);
      setFoundCharacters(prev => [...prev, character.character_name]);
      return;
    }
  }

  setMessage("Nada por aquí... 😅");
};
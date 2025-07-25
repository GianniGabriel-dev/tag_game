import { getGameData, saveScore } from "../services/gameService.js";

export const getGame = async (req, res) => {
  const gameId = parseInt(req.params.gameId, 10); 
  try {
    const gameData = await getGameData(gameId);
    console.log(gameData)
    return res.json({
      gameData: gameData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching game data" });
  }
};

export const postScore = async (req, res)=>{
  const { gameId, score, username} = req.body;
  console.log(gameId, score, username)
  if (!gameId || !score || !username) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    saveScore(gameId, score, username)
    console.log(`Score for game ${gameId}: ${score}`);
    return res.status(200).json({ message: "Score received successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error saving score" });
  }
}

export const startGameTime = (req, res)=>{
  const startedAt = new Date().toTimeString().split(" ")[0]
  console.log(startedAt)
  return res.status(200).json({startedAt})
}

export const endGameTime = (req, res)=>{
    const endedAt = new Date().toTimeString().split(" ")[0]
  console.log(endedAt)
  return res.status(200).json({endedAt})
}
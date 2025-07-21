import { getGameData } from "../services/gameService.js";

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
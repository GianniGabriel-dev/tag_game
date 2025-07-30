import {
  getAllGames,
  getGameData,
  getLeaderboard,
  saveScore,
  secondsToTime,
} from "../services/gameService.js";

export const getGame = async (req, res) => {
  const gameId = parseInt(req.params.gameId, 10);
  try {
    const gameData = await getGameData(gameId);
    return res.json({
      gameData: gameData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching game data" });
  }
};

export const postScore = async (req, res) => {
  const { gameId, score, username } = req.body;
  if (!gameId || !score || !username) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    saveScore(gameId, score, username);
    return res.status(200).json({ message: "Score received successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error saving score" });
  }
};

export const startGameTime = (req, res) => {
  const startedAt = new Date().toTimeString().split(" ")[0];
  return res.status(200).json({ startedAt });
};

export const endGameTime = (req, res) => {
  const endedAt = new Date().toTimeString().split(" ")[0];
  return res.status(200).json({ endedAt });
};

export const getLeaderboardPage = async (req, res) => {
  const gameId = parseInt(req.params.gameId, 10);
  try {
    const leaderboard = await getLeaderboard(gameId);
    const formattedLeaderboard = leaderboard.map((entry) => ({
      playerName: entry.player_name,
      timeScore: secondsToTime(entry.time_score),
      gameId: entry.game_id,
      playerId: entry.player_id,
    }));

    return res.json({
      leaderboard: formattedLeaderboard,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching leaderboard" });
  }
};

export const getGames = async (req, res) => {
  const allGames = await getAllGames();
  return res.json({
    allGames: allGames.map((game) => {
      return {
        gameId: game.game_id,
        gameName: game.game_name,
      };
    }),
  });
};

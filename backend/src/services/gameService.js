import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGameData = async (gameId) => {
  return await prisma.characters.findMany({
    where: {
      game_id: gameId,
    },
  });
};

export const saveScore = async (gameId, time_score, player_name) => {
  return await prisma.leaderboard.create({
    data: {
      game_id: gameId,
      time_score: time_score,
      player_name: player_name,
    },
  });
};
export const getLeaderboard = async (gameId) => {
  return await prisma.leaderboard.findMany({
    where: {
      game_id: gameId,
    },
    orderBy: {
      time_score: "asc",
    },
  });
};

export const secondsToTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formatMinutes = String(minutes).padStart(2, "0");
  const formatSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formatMinutes} : ${formatSeconds}`;
};

export const getAllGames = async () => {
  return await prisma.games.findMany({
    select: {
      game_id: true,
      game_name: true,
    },
  });
};

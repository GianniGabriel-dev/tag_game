import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getGameData = async (gameId) => {
  return await prisma.characters.findMany({
    where: {
      game_id: gameId,
    },
  });
};

export const saveScore = async (gameId, time_score, player_name)=>{
  return await prisma.leaderboard.create({
    data:{
      game_id: gameId,
      time_score:time_score,
      player_name:player_name
    }
  })
}



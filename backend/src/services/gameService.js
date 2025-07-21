import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getGameData = async (gameId) => {
  return await prisma.characters.findMany({
    where: {
      game_id: gameId,
    },
  });
};


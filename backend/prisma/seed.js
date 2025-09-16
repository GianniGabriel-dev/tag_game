import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Poblar juegos
  const gamesData = [
    { game_name: "ghibli" },
    { game_name: "island" },
    { game_name: "pokemon" }
  ];

  const games = [];
  for (const game of gamesData) {
    const g = await prisma.games.create({ data: game });
    games.push(g);
  }

  // Poblar personajes
  const charactersData = [
    { character_name: "flame", game_id: games[0].game_id, x: 18.27, y: 84.33 },
    { character_name: "pig", game_id: games[0].game_id, x: 24.31, y: 44.43 },
    { character_name: "totoro", game_id: games[0].game_id, x: 45.25, y: 60.65 },
    { character_name: "bunny", game_id: games[1].game_id, x: 37.11, y: 76.78 },
    { character_name: "raft", game_id: games[1].game_id, x: 5.30, y: 42.64 },
    { character_name: "chicken", game_id: games[1].game_id, x: 65.41, y: 57.51 },
    { character_name: "vanillite", game_id: games[2].game_id, x: 46.51, y: 86.60 },
    { character_name: "scraggy", game_id: games[2].game_id, x: 70.76, y: 56.02 },
    { character_name: "vaporeon", game_id: games[2].game_id, x: 70.55, y: 19.20 }
  ];

  for (const char of charactersData) {
    await prisma.characters.create({ data: char });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
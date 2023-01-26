import { prismaClient } from './lib/prisma';
import { PokemonService } from './module/pokemon';
import { PokemonRepository } from './module/pokemon/pokemon.repository';

// const prisma = new PrismaClient();

async function init() {
  const pokemonRepository = new PokemonRepository();
  const pokemonService = new PokemonService(pokemonRepository);

  await pokemonService.init();
  await pokemonRepository.show();
  await pokemonRepository.allDelete();
}

init()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });

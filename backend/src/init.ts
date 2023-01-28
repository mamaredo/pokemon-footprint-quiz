import { prismaClient } from './lib/prisma';
import { PokemonService } from './module/pokemon/pokemon.service';
import { PokemonRepository } from './module/pokemon/pokemon.repository';

async function init() {
  const pokemonRepository = new PokemonRepository();
  const pokemonService = new PokemonService(pokemonRepository);

  await Promise.all([
    pokemonService.init(),
    pokemonRepository.show(),
    pokemonRepository.allDelete(),
  ]);
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

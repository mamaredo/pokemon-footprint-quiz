import { prismaClient } from './lib/prisma';
import { PokemonService } from './module/pokemon';
import { PokemonRepository } from './module/pokemon/pokemon.repository';

// const prisma = new PrismaClient();

async function main() {
  // const pokemon = await prismaClient.pokemon.count({
  //   where: { pokedex: 1 },
  // });

  // console.log(pokemon);
  const pokemonService = new PokemonService(new PokemonRepository());
  pokemonService.init();
  // console.log('hello');
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });

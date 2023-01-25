import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app';
import { PokemonService } from './module/pokemon';
import { prismaClient } from './lib/prisma';

// async function main() {
//   // const pokemon = await prismaClient.pokemon.count({
//   //   where: { pokedex: 1 },
//   // });

//   // console.log(pokemon);
//   const pokemonService = new PokemonService();
//   pokemonService.init();
//   // console.log('hello');
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  // main()
  //   .then(async () => {
  //     await prismaClient.$disconnect();
  //   })
  //   .catch(async (e) => {
  //     console.error(e);
  //     await prismaClient.$disconnect();
  //     process.exit(1);
  //   });
}
bootstrap();

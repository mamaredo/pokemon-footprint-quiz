import { Prisma } from '@prisma/client';
import { prismaClient } from '../../lib/prisma';

export class PokemonRepository {
  async create(data: Prisma.PokemonCreateArgs['data'][]) {
    try {
      await prismaClient.pokemon.createMany({
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getRandomRecordList(limit: number) {
    const pokemonList = [];

    for (let i = 1; i < limit; i++) {
      const randomNamber = Math.floor(Math.random() * Math.floor(limit)) + 1;
      pokemonList.push(
        await prismaClient.pokemon.findUnique({
          where: { pokedex: String(randomNamber) }, // 更新されてない
        }),
      );
    }

    const result = await prismaClient.pokemon.findMany({
      where: {
        pokedex: pokedexList,
      },
    });
  }

  async show() {
    try {
      const result = await prismaClient.pokemon.findMany({
        orderBy: { pokedex: 'asc' },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async allDelete() {
    await prismaClient.pokemon.deleteMany({});
    console.log('all delete');
  }
}

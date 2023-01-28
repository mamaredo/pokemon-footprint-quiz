import { Pokemon, Prisma } from '@prisma/client';
import { prismaClient } from '../../lib/prisma';

export class PokemonRepository {
  async create(data: Pokemon[]) {
    try {
      await prismaClient.pokemon.createMany({
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getRandomRecordList(maxCount: number, randomLimit: number) {
    const searchPokdexList = [...Array(maxCount)].map(
      () => Math.floor(Math.random() * Math.floor(randomLimit)) + 1,
    );

    const result = searchPokdexList.map(async (pokedex) =>
      prismaClient.pokemon.findMany({
        where: { pokedex: String(pokedex) },
      }),
    );

    return await Promise.all(result);
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

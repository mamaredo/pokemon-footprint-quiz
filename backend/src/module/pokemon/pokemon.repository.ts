import { Pokemon, Prisma } from '@prisma/client';
import { prismaClient } from '../../lib/prisma';

const createRandomValue = (randomLimit: number, arr: number[]) => {
  const randomValue = Math.floor(Math.random() * Math.floor(randomLimit)) + 1;

  if (arr.includes(randomValue)) return createRandomValue(randomLimit, arr);
  return randomValue;
};

const createRandomArray = (maxCount: number, randomLimit: number) => {
  const randomArray = [...Array(maxCount)].fill(0);
  for (let i = 0; i < maxCount; i++) {
    randomArray[i] = createRandomValue(randomLimit, randomArray);
  }

  return randomArray;
};

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

  async getRandomRecordList(
    maxCount: number,
    randomLimit: number,
  ): Promise<Pokemon[]> {
    const searchPokdexList = createRandomArray(maxCount, randomLimit);

    const result = searchPokdexList.map(async (pokedex) =>
      prismaClient.pokemon.findMany({
        where: { pokedex: String(pokedex) },
      }),
    );

    const _result = await Promise.all(result);

    let pokemonList = [];
    for (const res of _result) {
      pokemonList = [...pokemonList, ...res];
    }

    return pokemonList;
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

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
    // prismaClient.pokemon.findMany({ select: { pokedex: true } });
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

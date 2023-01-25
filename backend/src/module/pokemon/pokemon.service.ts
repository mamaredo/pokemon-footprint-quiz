import { prismaClient } from 'src/lib/prisma';
import fetch from 'node-fetch';

export class PokemonService {
  async init() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/1');
    const {
      id,
      name,
      sprites: { front_default },
    } = await res.json();
    console.log({
      id,
      name,
      front_default,
    });
  }
}

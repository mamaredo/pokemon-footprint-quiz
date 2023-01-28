import fetch from 'node-fetch';
import { getColorFromURL } from 'color-thief-node';
import { join } from 'path';
import { PokemonRepository } from './pokemon.repository';
import { readdir, promises } from 'fs';
import { convertImageToBase64, getAssetsPath, getImageName } from '../../util';
import { Injectable } from '@nestjs/common';
import { Pokemon } from '@prisma/client';

type FootprintsColor = [4, 4, 4];
type NotFootprintsColor = [255, 255, 255];

// @Injectable()
export class PokemonService {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async init() {
    const fileList = await promises.readdir(
      join(__dirname, '/../../../assets'),
    );

    const resultList: Promise<Pokemon>[] = fileList.map(async (file) => {
      const assetsPath = getAssetsPath(file);
      const colorPallet: FootprintsColor | NotFootprintsColor =
        await getColorFromURL(assetsPath);

      if (colorPallet[0] === 255) return;

      const footprintFileName = getImageName(file);
      const base64Image = convertImageToBase64(assetsPath);

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${footprintFileName}`,
      );
      const {
        id,
        name,
        sprites: { front_default },
      } = await res.json();

      return {
        pokedex: String(id),
        name,
        picture: front_default,
        footprint: base64Image,
      };
    });

    const pokemonList = await Promise.all(resultList);
    await this.pokemonRepository.create(pokemonList);
  }

  async createQuizList(maxCount: number, randomLimit: number) {
    const pokemonList = await this.pokemonRepository.getRandomRecordList(
      maxCount,
      randomLimit,
    );

    const pokemonQuizList = pokemonList.map((pokemon, i) => ({
      ...pokemon,
      isCorrect: !!(i === 0),
    }));

    return pokemonQuizList;
  }
}

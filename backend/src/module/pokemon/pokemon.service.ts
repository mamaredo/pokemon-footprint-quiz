import fetch from 'node-fetch';
import { getColorFromURL } from 'color-thief-node';
import { join } from 'path';
import { PokemonRepository } from './pokemon.repository';
import { readdir } from 'fs';
import { convertImageToBase64, getAssetsPath, getImageName } from '../../util';
import { Prisma } from '@prisma/client';

type FootprintsColor = [4, 4, 4];
type NotFootprintsColor = [255, 255, 255];

export class PokemonService {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async init() {
    const result = [];
    readdir(join(__dirname, '/../../../assets'), async (err, fileList) => {
      if (err) return;

      for (const file of fileList) {
        const assetsPath = getAssetsPath(file);
        const colorPallet: FootprintsColor | NotFootprintsColor =
          await getColorFromURL(assetsPath);

        if (colorPallet[0] === 255) continue;

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

        result.push({
          pokedex: String(id),
          name,
          picture: front_default,
          footprint: base64Image,
        });
      }

      this.pokemonRepository.create(
        result as Prisma.PokemonCreateArgs['data'][],
      );
    });
  }
}

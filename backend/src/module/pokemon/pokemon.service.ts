import { prismaClient } from 'src/lib/prisma';
import fetch from 'node-fetch';
import { getColorFromURL } from 'color-thief-node';
import { join } from 'path';
import { PokemonRepository } from './pokemon.repository';
import { readdir, readFileSync } from 'fs';

type FootprintsColor = [4, 4, 4];
type NotFootprintsColor = [255, 255, 255];

export class PokemonService {
  constructor(pokemonRepository: PokemonRepository) {}

  async init() {
    // const res = await fetch('https://pokeapi.co/api/v2/pokemon/1');
    // const {
    //   id,
    //   name,
    //   sprites: { front_default },
    // } = await res.json();
    // console.log({
    //   id,
    //   name,
    //   front_default,
    // });

    /**
     * colorの取得
     * 4 黒, 255 白かの判定
     * 黒ならその番号のポケモン情報を取得, 白なら次のroopへ
     */
    readdir(join(__dirname, '/../../../assets'), async (err, fileList) => {
      if (err) return;

      for (const file of fileList) {
        const colorPallet: FootprintsColor | NotFootprintsColor =
          await getColorFromURL(join(__dirname, `/../../../assets/${file}`));

        if (colorPallet[0] === 255) {
          console.log('not footprints', file);
        } else if (colorPallet[0] === 4) {
          console.log('footprints', file);
        }
      }
    });
    const imagePath = join(__dirname, `/../../../assets/1.png`);
    const colorPallet: FootprintsColor | NotFootprintsColor =
      await getColorFromURL(imagePath);

    const base =
      'data:image/png;base64,' +
      Buffer.from(readFileSync(imagePath)).toString('base64');
    // const base = Buffer.from(readFileSync(imagePath)).toString('base64');
    console.log(Buffer.from(base, 'base64').toString());
    if (colorPallet[0] === 255) {
      console.log('not footprints');
    } else if (colorPallet[0] === 4) {
      console.log('footprints');
    }
    // console.log(fileList);
  }
}

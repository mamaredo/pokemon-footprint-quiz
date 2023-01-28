import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':pokedex')
  getHello(@Param('pokedex') pokedex: string): string {
    console.log('pokedex', pokedex);
    return;
  }
}

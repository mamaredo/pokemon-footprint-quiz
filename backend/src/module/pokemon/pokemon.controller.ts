import { Controller, Get, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('pokedex')
  async getHello(@Query('no') no: number) {
    const pokemon = await this.pokemonService.getPokemon(String(no));
    return { data: pokemon };
  }

  @Get('quiz')
  async getQuiz(@Query('between') between: number) {
    const quizList = await this.pokemonService.createQuizList(4, between);
    console.log(quizList);
    return { data: quizList };
  }
}

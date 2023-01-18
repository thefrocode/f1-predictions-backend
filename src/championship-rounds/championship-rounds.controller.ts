import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChampionshipRoundsService } from './championship-rounds.service';
import { CreateChampionshipRoundDto } from './dto/create-championship-round.dto';
import { UpdateChampionshipRoundDto } from './dto/update-championship-round.dto';

@Controller('championship-rounds')
export class ChampionshipRoundsController {
  constructor(private readonly championshipRoundsService: ChampionshipRoundsService) {}

  @Post()
  create(@Body() createChampionshipRoundDto: CreateChampionshipRoundDto) {
    return this.championshipRoundsService.create(createChampionshipRoundDto);
  }

  @Get()
  findAll() {
    return this.championshipRoundsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.championshipRoundsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChampionshipRoundDto: UpdateChampionshipRoundDto) {
    return this.championshipRoundsService.update(+id, updateChampionshipRoundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.championshipRoundsService.remove(+id);
  }
}

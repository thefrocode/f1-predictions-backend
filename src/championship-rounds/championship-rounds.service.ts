import { Injectable } from '@nestjs/common';
import { CreateChampionshipRoundDto } from './dto/create-championship-round.dto';
import { UpdateChampionshipRoundDto } from './dto/update-championship-round.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChampionshipRound } from './entities/championship-round.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChampionshipRoundsService {

  @InjectRepository(ChampionshipRound)
  private readonly championshipRoundRepository: Repository<ChampionshipRound>

  create(createChampionshipRoundDto: CreateChampionshipRoundDto) {
    const newChampionshipRound = this.championshipRoundRepository.create(createChampionshipRoundDto)
    return this.championshipRoundRepository.insert(newChampionshipRound)
  }

  findAll() {
    return this.championshipRoundRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} championshipRound`;
  }

  update(id: number, updateChampionshipRoundDto: UpdateChampionshipRoundDto) {
    return `This action updates a #${id} championshipRound`;
  }

  remove(id: number) {
    return `This action removes a #${id} championshipRound`;
  }
}

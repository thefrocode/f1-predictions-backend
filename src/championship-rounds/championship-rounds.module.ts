import { Module } from '@nestjs/common';
import { ChampionshipRoundsService } from './championship-rounds.service';
import { ChampionshipRoundsController } from './championship-rounds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChampionshipRound } from './entities/championship-round.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChampionshipRound])],
  controllers: [ChampionshipRoundsController],
  providers: [ChampionshipRoundsService]
})
export class ChampionshipRoundsModule {}

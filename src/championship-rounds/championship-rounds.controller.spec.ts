import { Test, TestingModule } from '@nestjs/testing';
import { ChampionshipRoundsController } from './championship-rounds.controller';
import { ChampionshipRoundsService } from './championship-rounds.service';

describe('ChampionshipRoundsController', () => {
  let controller: ChampionshipRoundsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChampionshipRoundsController],
      providers: [ChampionshipRoundsService],
    }).compile();

    controller = module.get<ChampionshipRoundsController>(ChampionshipRoundsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

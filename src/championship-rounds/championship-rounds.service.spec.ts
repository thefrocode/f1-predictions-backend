import { Test, TestingModule } from '@nestjs/testing';
import { ChampionshipRoundsService } from './championship-rounds.service';

describe('ChampionshipRoundsService', () => {
  let service: ChampionshipRoundsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChampionshipRoundsService],
    }).compile();

    service = module.get<ChampionshipRoundsService>(ChampionshipRoundsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

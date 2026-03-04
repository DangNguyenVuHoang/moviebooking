import { Test, TestingModule } from '@nestjs/testing';
import { TheaterComplexesService } from './theater-complexes.service';

describe('TheaterComplexesService', () => {
  let service: TheaterComplexesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TheaterComplexesService],
    }).compile();

    service = module.get<TheaterComplexesService>(TheaterComplexesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

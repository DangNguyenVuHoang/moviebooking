import { Test, TestingModule } from '@nestjs/testing';
import { TheaterSystemsService } from './theater-systems.service';

describe('TheaterSystemsService', () => {
  let service: TheaterSystemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TheaterSystemsService],
    }).compile();

    service = module.get<TheaterSystemsService>(TheaterSystemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

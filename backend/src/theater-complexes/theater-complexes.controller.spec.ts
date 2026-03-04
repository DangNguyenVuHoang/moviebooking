import { Test, TestingModule } from '@nestjs/testing';
import { TheaterComplexesController } from './theater-complexes.controller';

describe('TheaterComplexesController', () => {
  let controller: TheaterComplexesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TheaterComplexesController],
    }).compile();

    controller = module.get<TheaterComplexesController>(TheaterComplexesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

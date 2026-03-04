import { Test, TestingModule } from '@nestjs/testing';
import { TheaterSystemsController } from './theater-systems.controller';

describe('TheaterSystemsController', () => {
  let controller: TheaterSystemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TheaterSystemsController],
    }).compile();

    controller = module.get<TheaterSystemsController>(TheaterSystemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

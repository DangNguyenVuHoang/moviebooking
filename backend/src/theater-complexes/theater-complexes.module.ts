import { Module } from '@nestjs/common';
import { TheaterComplexesService } from './theater-complexes.service';
import { TheaterComplexesController } from './theater-complexes.controller';

@Module({
  providers: [TheaterComplexesService],
  controllers: [TheaterComplexesController]
})
export class TheaterComplexesModule {}

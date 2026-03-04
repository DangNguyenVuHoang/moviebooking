import { Module } from '@nestjs/common';
import { TheaterSystemsService } from './theater-systems.service';
import { TheaterSystemsController } from './theater-systems.controller';

@Module({
  providers: [TheaterSystemsService],
  controllers: [TheaterSystemsController]
})
export class TheaterSystemsModule {}

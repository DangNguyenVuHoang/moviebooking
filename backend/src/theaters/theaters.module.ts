import { Module } from '@nestjs/common';
import { TheatersService } from './theaters.service';
import { TheatersController } from './theaters.controller';

@Module({
  providers: [TheatersService],
  controllers: [TheatersController]
})
export class TheatersModule {}

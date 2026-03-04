import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { TheaterSystemsModule } from './theater-systems/theater-systems.module';
import { TheaterComplexesModule } from './theater-complexes/theater-complexes.module';
import { TheatersModule } from './theaters/theaters.module';
import { SeatsModule } from './seats/seats.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { BookingsModule } from './bookings/bookings.module';


@Module({
  imports: [PrismaModule, UsersModule, AuthModule, MoviesModule, TheaterSystemsModule, TheaterComplexesModule, TheatersModule, SeatsModule, ShowtimesModule, BookingsModule],
})
export class AppModule {}
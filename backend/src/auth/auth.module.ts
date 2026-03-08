import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

const jwtSecret = process.env.JWT_SECRET || 'super_secret';
const expiresInRaw = process.env.JWT_EXPIRES_IN || '1d';

const expiresIn: number | StringValue =
  /^\d+$/.test(expiresInRaw)
    ? Number(expiresInRaw)
    : (expiresInRaw as StringValue);

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [RolesGuard],
})
export class AuthModule {}
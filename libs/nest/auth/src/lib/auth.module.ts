import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  controllers: [],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [],
})
export class AuthModule {}

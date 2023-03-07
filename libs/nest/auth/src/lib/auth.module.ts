import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../strategies/local.strategy';

@Module({
  controllers: [],
  providers: [AuthService, LocalStrategy],
  exports: [],
})
export class AuthModule {}

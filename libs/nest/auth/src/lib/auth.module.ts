import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwt-secret', // TODO: extract in configuration
      signOptions: { expiresIn: '60s' }, // TODO: extract in configuration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [],
})
export class AuthModule {}

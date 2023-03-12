import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthModuleOptions } from '../interfaces/auth-options.interface';

@Module({})
export class AuthModule {
  static forRoot(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        JwtModule.register({
          ...options.jwt,
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      exports: [],
    };
  }
}

import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthModuleOptions } from '../interfaces/auth-options.interface';
import { UsersModule } from '@libs/nest/users/lib/users.module';

@Module({})
export class AuthModule {
  static forRoot(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        UsersModule, // TODO: dependency must be less tough
        JwtModule.register({
          ...options.jwt,
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        LocalStrategy,
        {
          provide: JwtStrategy,
          useFactory: () => new JwtStrategy(options.jwt),
        },
      ],
      exports: [],
    };
  }
}

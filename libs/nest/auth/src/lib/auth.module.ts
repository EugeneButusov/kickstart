import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import {
  AuthModuleAsyncOptions,
  AuthModuleOptions,
} from '../interfaces/auth-options.interface';
import { UsersModule } from '@libs/nest/users/lib/users.module';

const AUTH_MODULE_OPTIONS_TOKEN = Symbol('AUTH_MODULE_OPTIONS_TOKEN');

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

  static forRootAsync(options: AuthModuleAsyncOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        ...options.imports,

        UsersModule, // TODO: dependency must be less tough
        JwtModule.registerAsync({
          inject: [AUTH_MODULE_OPTIONS_TOKEN],
          useFactory: (authModuleOptions: AuthModuleOptions) =>
            authModuleOptions.jwt,
        }),
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: AUTH_MODULE_OPTIONS_TOKEN,
          inject: options.inject,
          useFactory: options.useFactory,
        },
        AuthService,
        LocalStrategy,
        {
          inject: [AUTH_MODULE_OPTIONS_TOKEN],
          provide: JwtStrategy,
          useFactory: (authModuleOptions: AuthModuleOptions) =>
            new JwtStrategy(authModuleOptions.jwt),
        },
      ],
      exports: [],
    };
  }
}

import { AppModule } from '../app/app.module';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@libs/nest/auth/lib/auth.module';
import { AuthModuleOptions } from '@libs/nest/auth/interfaces/auth-options.interface';
import { toBoolean, toInt } from '@libs/shared/utils';
import { AppConfig } from '../interfaces/app-config.interface';

export default [
  () => ({
    // AppModule is not initialized yet to be used in `registerAs`
    [AppModule.name]: {
      appName: process.env.APP_NAME || 'Kickstart API',
      port: toInt(process.env.APP_PORT, 3333),
      host: process.env.APP_HOST,
      secure: toBoolean(process.env.APP_SECURE, false),
      globalPrefix: process.env.APP_GLOBAL_PREFIX || 'api',
    } as AppConfig,
  }),

  registerAs<TypeOrmModuleOptions>(TypeOrmModule.name, () => ({
    type: 'mongodb',
    url: process.env.MONGO_URI,
    autoLoadEntities: true,
    synchronize: toBoolean(process.env.MONGO_SHOULD_SYNCHRONIZE, false),
  })),

  registerAs<AuthModuleOptions>(AuthModule.name, () => ({
    jwt: {
      secret: process.env.AUTH_JWT_SECRET,
      signOptions: { expiresIn: process.env.AUTH_JWT_EXPIRES_IN },
    },
  })),
];

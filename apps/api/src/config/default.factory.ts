import { AppModule } from '../app/app.module';
import { UsersModule } from '@libs/nest/users/lib/users.module';
import { AuthModule } from '@libs/nest/auth/lib/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { toBoolean } from '@libs/shared/utils/to-boolean.util';

export default () => ({
  [AppModule.name]: {
    appName: process.env.APP_NAME || 'Kickstart API',
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
    secure: toBoolean(process.env.APP_SECURE, false),
    globalPrefix: process.env.APP_GLOBAL_PREFIX || 'api',
  },
  [TypeOrmModule.name]: {
    type: 'mongodb',
    url: process.env.MONGO_URI,
    autoLoadEntities: true,
    synchronize: toBoolean(process.env.MONGO_SHOULD_SYNCHRONIZE, false),
  },
  [AuthModule.name]: {
    jwt: {
      secret: process.env.AUTH_JWT_SECRET,
      signOptions: { expiresIn: process.env.AUTH_JWT_EXPIRES_IN },
    },
  },
  [UsersModule.name]: {},
});

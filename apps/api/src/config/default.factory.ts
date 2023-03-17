import { AppModule } from '../app/app.module';
import { UsersModule } from '@libs/nest/users/lib/users.module';
import { AuthModule } from '@libs/nest/auth/lib/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

export default () => ({
  [AppModule.name]: {
    appName: process.env.APP_NAME || 'Kickstart API',
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
    secure: process.env.APP_SECURE || false,
    globalPrefix: process.env.APP_GLOBAL_PREFIX || 'api',
  },
  [TypeOrmModule.name]: {},
  [AuthModule.name]: {},
  [UsersModule.name]: {},
});

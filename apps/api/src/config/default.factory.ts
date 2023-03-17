import { AppModule } from '../app/app.module';
import { UsersModule } from '@libs/nest/users/lib/users.module';
import { AuthModule } from '@libs/nest/auth/lib/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

export default () => ({
  [AppModule.name]: {
    port: process.env.PORT,
  },
  [TypeOrmModule.name]: {},
  [AuthModule.name]: {},
  [UsersModule.name]: {},
});

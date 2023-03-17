import { AppModule } from '../app/app.module';
import { UsersModule } from '@libs/nest/users/lib/users.module';
import { AuthModule } from '@libs/nest/auth/lib/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from '../interfaces/app-config.interface';

export default (): AppConfig => ({
  [AppModule.name]: {},
  [TypeOrmModule.name]: {},
  [AuthModule.name]: {},
  [UsersModule.name]: {},
});

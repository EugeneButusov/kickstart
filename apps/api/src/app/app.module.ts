import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@libs/nest/users/lib/users.module';
import { AuthModule } from '@libs/nest/auth/lib/auth.module';

@Module({
  imports: [
    // TODO: config must be extracted
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017',
      database: 'default',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

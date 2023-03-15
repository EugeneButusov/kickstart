import { Module } from '@nestjs/common';
import { DefaultUsersController } from '../controllers/default.users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { MeUsersController } from '../controllers/me.users.controller';
import { AdminUsersController } from '../controllers/admin.users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  // controllers ordering matters
  controllers: [
    MeUsersController,
    AdminUsersController,
    DefaultUsersController,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

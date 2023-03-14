import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { MeController } from '../controllers/me.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [MeController, UsersController], // controllers ordering matters
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

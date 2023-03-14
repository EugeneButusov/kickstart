import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { MeController } from './me.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [MeController, UsersController], // controllers ordering matters
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

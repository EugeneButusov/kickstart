import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

describe('UsersController', () => {
  const usersRepositoryMock = {};
  let controller: UsersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue: usersRepositoryMock,
        },
        UsersService,
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

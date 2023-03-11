import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const usersServiceMock = {
  create: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
  updateById: jest.fn(),
  deleteById: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
      controllers: [UsersController],
    }).compile();

    controller = module.get(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  xdescribe('#create', () => {});

  xdescribe('#get', () => {});

  xdescribe('#list', () => {});

  xdescribe('#update', () => {});

  xdescribe('#delete', () => {});
});

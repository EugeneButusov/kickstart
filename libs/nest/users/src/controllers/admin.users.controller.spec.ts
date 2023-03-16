import { Test } from '@nestjs/testing';
import { UsersService } from '../lib/users.service';
import { userFixture } from '../../test/fixtures/user.fixture';
import { AdminUsersController } from './admin.users.controller';

const usersServiceMock = {
  create: jest
    .fn()
    .mockImplementation((payload) => ({ ...payload, ...userFixture() })),
};

describe('AdminUsersController', () => {
  let controller: AdminUsersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
      controllers: [AdminUsersController],
    }).compile();

    controller = module.get(AdminUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

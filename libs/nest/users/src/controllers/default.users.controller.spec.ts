import { Test } from '@nestjs/testing';
import { DefaultUsersController } from './default.users.controller';
import { UsersService } from '../lib/users.service';
import { createUserParamsFixture } from '../../test/fixtures/create-user-params.fixture';
import { userFixture } from '../../../auth/test/fixtures/user.fixture';

const usersServiceMock = {
  create: jest
    .fn()
    .mockImplementation((payload) => ({ ...payload, ...userFixture() })),
};

describe('UsersController', () => {
  let controller: DefaultUsersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
      controllers: [DefaultUsersController],
    }).compile();

    controller = module.get(DefaultUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  describe('#create', () => {
    const createUserParams = createUserParamsFixture();

    describe('happy path', () => {
      it('should resolve with user', () =>
        expect(controller.create(createUserParams)).resolves
          .toMatchInlineSnapshot(`
          UserGetDto {
            "id": "id-1",
            "role": "regular",
            "username": "username-1",
          }
        `));
    });
  });
});

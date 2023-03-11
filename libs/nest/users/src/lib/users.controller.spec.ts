import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as _ from 'lodash';

// TODO: implement factory for fixtures
const userFixture = (seed = '1') => ({
  id: `id-${seed}`,
  username: `username-${seed}`,
});

const usersServiceMock = {
  create: jest
    .fn()
    .mockImplementation((payload) => ({ ...payload, ...userFixture() })),
  findById: jest.fn().mockImplementation((id) => ({ ...userFixture(), id })),
  find: jest.fn().mockImplementation(() => [{ ...userFixture() }]),
  updateById: jest.fn().mockImplementation(() => ({ affected: 1 })),
  deleteById: jest.fn().mockImplementation(() => ({ affected: 1 })),
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

  describe('#create', () => {
    const userCreateParams = _.omit(userFixture(), 'id');

    describe('happy path', () => {
      it('should resolve with user', () =>
        expect(controller.create(userCreateParams)).resolves
          .toMatchInlineSnapshot(`
          {
            "id": "id-1",
            "username": "username-1",
          }
        `));
    });
  });

  xdescribe('#get', () => {});

  xdescribe('#list', () => {});

  xdescribe('#update', () => {});

  xdescribe('#delete', () => {});
});

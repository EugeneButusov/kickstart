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
  updateById: jest.fn().mockImplementation(() => true),
  deleteById: jest.fn().mockImplementation(() => true),
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

  describe('#get', () => {
    const userId = 'test-id';

    describe('happy path', () => {
      it('should resolve to entity', () =>
        expect(controller.get(userId)).resolves.toMatchInlineSnapshot(`
          {
            "id": "test-id",
            "username": "username-1",
          }
        `));
    });

    describe('when nothing found', () => {
      beforeAll(() => {
        usersServiceMock.findById.mockResolvedValueOnce(null);
      });

      it('should reject', () =>
        expect(
          controller.get(userId)
        ).rejects.toThrowErrorMatchingInlineSnapshot(`"User not found"`));
    });
  });

  describe('#list', () => {
    describe('happy path', () => {
      it('should resolve to array', () =>
        expect(controller.list()).resolves.toMatchInlineSnapshot(`
          [
            {
              "id": "id-1",
              "username": "username-1",
            },
          ]
        `));
    });

    describe('when nothing found', () => {
      beforeAll(() => {
        usersServiceMock.find.mockResolvedValueOnce([]);
      });

      it('should resolve to an empty array', () =>
        expect(controller.list()).resolves.toMatchInlineSnapshot(`[]`));
    });
  });

  describe('#update', () => {
    const userId = 'test-id';

    describe('happy path', () => {
      it('should resolve', () =>
        expect(controller.update(userId, userFixture())).resolves.toBe(
          undefined
        ));
    });

    describe('when nothing found', () => {
      beforeAll(() => {
        usersServiceMock.updateById.mockResolvedValueOnce(false);
      });

      it('should reject', () =>
        expect(
          controller.update(userId, userFixture())
        ).rejects.toThrowErrorMatchingInlineSnapshot(`"User not found"`));
    });
  });

  describe('#delete', () => {
    const userId = 'test-id';

    describe('happy path', () => {
      it('should resolve', () =>
        expect(controller.delete(userId)).resolves.toBe(undefined));
    });

    describe('when nothing found', () => {
      beforeAll(() => {
        usersServiceMock.deleteById.mockResolvedValueOnce(false);
      });

      it('should reject', () =>
        expect(
          controller.delete(userId)
        ).rejects.toThrowErrorMatchingInlineSnapshot(`"User not found"`));
    });
  });
});

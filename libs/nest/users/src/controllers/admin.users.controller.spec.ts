import { Test } from '@nestjs/testing';
import { UsersService } from '../lib/users.service';
import { userFixture } from '../../test/fixtures/user.fixture';
import { AdminUsersController } from './admin.users.controller';

const usersServiceMock = {
  findById: jest.fn().mockImplementation((id) => ({ ...userFixture(), id })),
  find: jest.fn().mockImplementation(() => [{ ...userFixture() }]),
  updateById: jest.fn().mockImplementation(() => true),
  deleteById: jest.fn().mockImplementation(() => true),
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

  describe('#get', () => {
    const userId = 'test-id';

    describe('happy path', () => {
      it('should resolve to entity', () =>
        expect(controller.get(userId)).resolves.toMatchInlineSnapshot(`
          UserGetDto {
            "id": "test-id",
            "role": "regular",
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
              "role": "regular",
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

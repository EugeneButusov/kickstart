import { Test } from '@nestjs/testing';
import { UsersService } from '../lib/users.service';
import { MeUsersController } from './me.users.controller';
import { userFixture } from '../../test/fixtures/user.fixture';

const usersServiceMock = {
  findById: jest.fn().mockImplementation((id) => ({ ...userFixture(), id })),
  updateById: jest.fn().mockImplementation(() => true),
};

describe('MeController', () => {
  let controller: MeUsersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
      controllers: [MeUsersController],
    }).compile();

    controller = module.get(MeUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  describe('#get', () => {
    const meId = 'test-id';

    describe('happy path', () => {
      it('should resolve to entity', () =>
        expect(controller.get(meId)).resolves.toMatchInlineSnapshot(`
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
        expect(controller.get(meId)).rejects.toThrowErrorMatchingInlineSnapshot(
          `"User not found"`
        ));
    });
  });

  describe('#update', () => {
    const meId = 'test-id';

    describe('happy path', () => {
      it('should resolve', () =>
        expect(controller.update(meId, userFixture())).resolves.toBe(
          undefined
        ));
    });

    describe('when nothing found', () => {
      beforeAll(() => {
        usersServiceMock.updateById.mockResolvedValueOnce(false);
      });

      it('should reject', () =>
        expect(
          controller.update(meId, userFixture())
        ).rejects.toThrowErrorMatchingInlineSnapshot(`"User not found"`));
    });
  });
});

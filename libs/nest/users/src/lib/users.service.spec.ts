import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

// TODO: implement factory for fixtures
const userFixture = (seed = '1') => ({ username: `username-${seed}` });

const usersRepositoryMock = {
  create: jest.fn().mockImplementation(() => ({ ...userFixture() })),
  save: jest
    .fn()
    .mockImplementation((entity) => ({ ...entity, id: 'test-id' })),
  findOneById: jest.fn().mockImplementation((id) => ({ ...userFixture(), id })),
  findOneBy: jest
    .fn()
    .mockImplementation(({ username }) => ({ id: 'test-id', username })),
  findBy: jest
    .fn()
    .mockImplementation(() => [{ ...userFixture(), id: 'test-id' }]),
  update: jest.fn().mockImplementation(() => ({ affected: 1 })),
  delete: jest.fn().mockImplementation(() => ({ affected: 1 })),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue: usersRepositoryMock,
        },
        UsersService,
      ],
    }).compile();

    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  describe('#create', () => {
    const user = userFixture();

    describe('happy path', () => {
      it('should resolve', () =>
        expect(service.create(user)).resolves.toMatchInlineSnapshot(`
          {
            "id": "test-id",
            "username": "username-1",
          }
        `));
    });
  });

  describe('#findById', () => {
    const userId = 'test-id';

    describe('happy path', () => {
      it('should resolve to entity', () =>
        expect(service.findById(userId)).resolves.toMatchInlineSnapshot(`
          {
            "id": "test-id",
            "username": "username-1",
          }
        `));
    });

    describe('when nothing found', () => {
      beforeAll(() => {
        usersRepositoryMock.findOneById.mockResolvedValueOnce(null);
      });

      it('should resolve to null', () =>
        expect(service.findById(userId)).resolves.toBe(null));
    });
  });

  describe('#findByUsername', () => {
    const username = 'test-username';
    const password = 'test-password';

    describe('happy path', () => {
      it('should resolve to entity', () =>
        expect(service.findByUsernameAndPassword(username, password)).resolves
          .toMatchInlineSnapshot(`
          {
            "id": "test-id",
            "username": "test-username",
          }
        `));
    });

    describe('when nothing found', () => {
      beforeAll(() => {
        usersRepositoryMock.findOneBy.mockResolvedValueOnce(null);
      });

      it('should resolve to null', () =>
        expect(
          service.findByUsernameAndPassword(username, password)
        ).resolves.toBe(null));
    });
  });

  describe('#find', () => {
    describe('happy path', () => {
      it('should resolve to array', () =>
        expect(service.find()).resolves.toMatchInlineSnapshot(`
          [
            {
              "id": "test-id",
              "username": "username-1",
            },
          ]
        `));
    });

    describe('when nothing found', () => {
      beforeAll(() => {
        usersRepositoryMock.findBy.mockResolvedValueOnce([]);
      });

      it('should resolve to an empty array', () =>
        expect(service.find()).resolves.toMatchInlineSnapshot(`[]`));
    });
  });

  describe('#updateById', () => {
    const userId = 'test-id';

    describe('happy path', () => {
      it('should resolve to true', () =>
        expect(service.updateById(userId, userFixture('2'))).resolves.toBe(
          true
        ));
    });

    describe('when nothing to update', () => {
      beforeAll(() => {
        usersRepositoryMock.update.mockResolvedValueOnce({ affected: 0 });
      });

      it('should resolve to false', () =>
        expect(service.updateById(userId, userFixture('2'))).resolves.toBe(
          false
        ));
    });
  });

  describe('#deleteById', () => {
    const userId = 'test-id';

    describe('happy path', () => {
      it('should resolve', () =>
        expect(service.deleteById(userId)).resolves.toBe(true));
    });

    describe('when nothing to delete', () => {
      beforeAll(() => {
        usersRepositoryMock.delete.mockResolvedValueOnce({ affected: 0 });
      });

      it('should resolve to false', () =>
        expect(service.deleteById(userId)).resolves.toBe(false));
    });
  });
});

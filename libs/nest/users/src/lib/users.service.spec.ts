import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { createUserParamsFixture } from '../../test/fixtures/create-user-params.fixture';

const usersRepositoryMock = {
  create: jest.fn().mockImplementation((entity) => ({
    ...entity,
  })),
  save: jest
    .fn()
    .mockImplementation((entity) => ({ ...entity, id: 'test-id' })),
  findOneById: jest.fn().mockImplementation((id) => ({
    username: createUserParamsFixture().username,
    id,
  })),
  findOneBy: jest
    .fn()
    .mockImplementation(({ username }) => ({ id: 'test-id', username })),
  findBy: jest
    .fn()
    .mockImplementation(() => [
      { id: 'test-id', username: createUserParamsFixture().username },
    ]),
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
    const createUserParams = createUserParamsFixture();

    describe('happy path', () => {
      it('should resolve', () =>
        // TODO: checks must be more detailed
        expect(service.create(createUserParams)).resolves.toBeDefined());
    });
  });

  describe('#findById', () => {
    const userId = 'test-id';

    describe('happy path', () => {
      it('should resolve to entity', () =>
        expect(service.findById(userId)).resolves.toMatchInlineSnapshot(`
          {
            "id": "test-id",
            "username": "testuser-0",
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

  describe('#findByUsernameAndPassword', () => {
    const createUserParams = createUserParamsFixture();

    describe('happy path', () => {
      beforeAll(async () => {
        const user = await service.create(createUserParams);
        usersRepositoryMock.findOneBy.mockResolvedValueOnce(user);
      });

      it('should resolve to entity', () =>
        // TODO: checks must be more detailed
        expect(
          service.findByUsernameAndPassword(
            createUserParams.username,
            createUserParams.password
          )
        ).resolves.toBeDefined());
    });

    describe('when nothing found', () => {
      beforeAll(() => {
        usersRepositoryMock.findOneBy.mockResolvedValueOnce(null);
      });

      it('should resolve to null', () =>
        expect(
          service.findByUsernameAndPassword(
            createUserParams.username,
            createUserParams.password
          )
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
              "username": "testuser-0",
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
        expect(
          service.updateById(userId, createUserParamsFixture())
        ).resolves.toBe(true));
    });

    describe('when nothing to update', () => {
      beforeAll(() => {
        usersRepositoryMock.update.mockResolvedValueOnce({ affected: 0 });
      });

      it('should resolve to false', () =>
        expect(
          service.updateById(userId, createUserParamsFixture())
        ).resolves.toBe(false));
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

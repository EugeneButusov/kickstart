import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '@libs/nest/users/lib/users.service';
import { JwtModule } from '@nestjs/jwt';

// TODO: implement factory for fixtures
const userFixture = (seed = '1') => ({
  id: `id-${seed}`,
  username: `username-${seed}`,
});

const usersServiceMock = {
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

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [JwtModule],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
        AuthService,
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

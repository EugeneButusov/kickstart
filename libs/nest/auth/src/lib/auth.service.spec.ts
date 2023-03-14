import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '@libs/nest/users/lib/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

// TODO: implement factory for fixtures
const userFixture = (seed = '1') => ({
  id: `id-${seed}`,
  username: `username-${seed}`,
});

const usersServiceMock = {
  findByUsername: jest
    .fn()
    .mockImplementation(({ username }) => ({ ...userFixture(), username })),
};

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test-secret',
        }),
      ],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
        AuthService,
      ],
    }).compile();

    service = module.get(AuthService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  describe('#validate', () => {
    const credentials = {
      username: 'test-username',
      password: 'test-password',
    };

    describe('happy path', () => {
      it('should resolve correctly', () =>
        expect(service.validate(credentials.username, credentials.password))
          .resolves.toMatchInlineSnapshot(`
          {
            "id": "id-1",
            "username": undefined,
          }
        `));
    });

    describe('when user is not found', () => {
      beforeAll(() => {
        usersServiceMock.findByUsername.mockResolvedValueOnce(null);
      });

      it('should resolve correctly', () =>
        expect(
          service.validate(credentials.username, credentials.password)
        ).resolves.toBe(null));
    });
  });

  describe('#login', () => {
    describe('happy path', () => {
      it('should resolve correctly', async () => {
        const { accessToken } = await service.login(userFixture());
        expect(await jwtService.verifyAsync(accessToken)).toMatchInlineSnapshot(
          { iat: expect.any(Number) },
          `
          {
            "iat": Any<Number>,
            "sub": "id-1",
            "username": "username-1",
          }
        `
        );
      });
    });
  });
});

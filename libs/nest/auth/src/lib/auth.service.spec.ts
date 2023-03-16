import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '@libs/nest/users/lib/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { userFixture } from '../../test/fixtures/user.fixture';

const usersServiceMock = {
  findByUsernameAndPassword: jest
    .fn()
    .mockImplementation((username) => ({ ...userFixture(), username })),
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
            "hashedPassword": "hashed-password-1",
            "id": "id-1",
            "role": "regular",
            "username": "test-username",
          }
        `));
    });

    describe('when user is not found', () => {
      beforeAll(() => {
        usersServiceMock.findByUsernameAndPassword.mockResolvedValueOnce(null);
      });

      it('should resolve correctly', () =>
        expect(
          service.validate(credentials.username, credentials.password)
        ).resolves.toBe(null));
    });
  });

  describe('#authenticate', () => {
    describe('happy path', () => {
      it('should resolve correctly', async () => {
        const { accessToken } = await service.authenticate(userFixture());
        expect(await jwtService.verifyAsync(accessToken)).toMatchInlineSnapshot(
          { iat: expect.any(Number) },
          `
          {
            "iat": Any<Number>,
            "role": "regular",
            "sub": "id-1",
            "username": "username-1",
          }
        `
        );
      });
    });
  });
});

import { Test } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { AuthService } from '../lib/auth.service';

// TODO: implement factory for fixtures
const userFixture = (seed = '1') => ({
  id: `id-${seed}`,
  username: `username-${seed}`,
});

const authServiceMock = {
  validate: jest
    .fn()
    .mockImplementation((username) => ({ ...userFixture(), username })),
};

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        LocalStrategy,
      ],
    }).compile();

    strategy = module.get(LocalStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeTruthy();
  });

  describe('#validate', () => {
    const credentials = {
      username: 'test-username',
      password: 'test-password',
    };

    describe('happy path', () => {
      it('should resolve correctly', () =>
        expect(strategy.validate(credentials.username, credentials.password))
          .resolves.toMatchInlineSnapshot(`
          {
            "id": "id-1",
            "username": "test-username",
          }
        `));
    });

    describe('user not found', () => {
      beforeAll(() => {
        authServiceMock.validate.mockResolvedValueOnce(null);
      });

      it('should resolve correctly', () =>
        expect(
          strategy.validate(credentials.username, credentials.password)
        ).rejects.toMatchInlineSnapshot(
          `[UnauthorizedException: Unauthorized]`
        ));
    });
  });
});

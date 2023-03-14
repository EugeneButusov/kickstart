import { Test } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: JwtStrategy,
          useFactory: () => new JwtStrategy({ secret: 'test-secret' }),
        },
      ],
    }).compile();

    strategy = module.get(JwtStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeTruthy();
  });

  describe('#validate', () => {
    const payload = {
      sub: 'test-sub',
      username: 'test-username',
    };
    describe('happy path', () => {
      it('should resolve correctly', () =>
        expect(strategy.validate(payload)).resolves.toMatchInlineSnapshot(`
          {
            "id": "test-sub",
            "username": "test-username",
          }
        `));
    });
  });
});
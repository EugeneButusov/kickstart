import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(options: JwtModuleOptions) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: options.secret,
    });
  }

  async validate(payload: Record<string, unknown>) {
    return { id: payload.sub, username: payload.username };
  }
}

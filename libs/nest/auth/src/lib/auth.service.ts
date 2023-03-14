import { Injectable } from '@nestjs/common';
import { UsersService } from '@libs/nest/users/lib/users.service';
import { User } from '@libs/nest/users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { Authentication } from '../interfaces/login-result.interface';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validate(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByUsername(username);
    return user;
  }

  async authenticate(user: Request['user']): Promise<Authentication> {
    const payload = { sub: user.id, username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

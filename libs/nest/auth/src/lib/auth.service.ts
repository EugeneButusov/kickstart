import { Injectable } from '@nestjs/common';
import { UsersService } from '@libs/nest/users/lib/users.service';
import { User } from '@libs/nest/users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { Authentication } from '../interfaces/login-result.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validate(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByUsernameAndPassword(
      username,
      password
    );
    return user;
  }

  async authenticate(user: User): Promise<Authentication> {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

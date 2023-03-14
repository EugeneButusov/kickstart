import { Injectable } from '@nestjs/common';
import { UsersService } from '@libs/nest/users/lib/users.service';
import { User } from '@libs/nest/users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

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

  async login(user: User) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
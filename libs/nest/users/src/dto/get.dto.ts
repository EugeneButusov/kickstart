import { ApiProperty } from '@nestjs/swagger';
import { User } from '../interfaces/user.interface';

export class UserGetDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
  }

  static fromUserEntity(user: User) {
    return new this(user);
  }
}

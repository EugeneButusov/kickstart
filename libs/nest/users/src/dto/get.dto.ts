import { ApiProperty } from '@nestjs/swagger';
import { User } from '../interfaces/user.interface';
import { UserRole } from '@libs/nest/users/types/user-role.enum';

export class UserGetDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.role = user.role;
  }

  static fromUserEntity(user: User) {
    return new this(user);
  }
}

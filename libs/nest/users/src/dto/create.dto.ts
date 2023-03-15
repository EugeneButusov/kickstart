import { ApiProperty } from '@nestjs/swagger';
import { CreateUserParams } from '../interfaces/create-user-params.interface';

export class UserCreateDto implements CreateUserParams {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

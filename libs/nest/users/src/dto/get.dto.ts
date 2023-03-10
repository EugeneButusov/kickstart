import { ApiProperty } from '@nestjs/swagger';

export class UserGetDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class IssueTokenDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

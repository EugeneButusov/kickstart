import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../lib/users.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from '../dto/create.dto';
import { UserGetDto } from '../dto/get.dto';

@Controller('users')
@ApiTags('users')
export class DefaultUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserGetDto, description: 'Returns created user' })
  async create(@Body() payload: UserCreateDto): Promise<UserGetDto> {
    // TODO: handle duplication errors
    const user = await this.usersService.create(payload);
    return UserGetDto.fromUserEntity(user);
  }
}

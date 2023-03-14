import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../lib/users.service';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserUpdateDto } from '../dto/update.dto';
import { UserGetDto } from '../dto/get.dto';
import { AuthGuard } from '@nestjs/passport';
import { Me } from '../decorators/me.decorator';

@Controller('users/me')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class MeController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @ApiOkResponse({
    type: UserGetDto,
    description: 'Returns user matching the credentials',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async get(@Me('id') id: string): Promise<UserGetDto> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Patch('')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Returns in case if user successfully updated',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async update(
    @Me('id') id: string,
    @Body() payload: UserUpdateDto
  ): Promise<void> {
    if (!(await this.usersService.updateById(id, payload))) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}

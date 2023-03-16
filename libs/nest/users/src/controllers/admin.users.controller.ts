import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../lib/users.service';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserUpdateDto } from '../dto/update.dto';
import { UserGetDto } from '../dto/get.dto';
import { Roles } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { Role } from '../types/role.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin/users')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Roles([Role.Admin])
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Authentication missed or invalid ' })
@ApiForbiddenResponse({
  description: 'This endpoint has been called by non-admin user',
})
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @ApiOkResponse({
    type: UserGetDto,
    description: 'Returns user matching the id',
  })
  @ApiNotFoundResponse({ description: 'User with specified id not found' })
  async get(@Param('id') id: string): Promise<UserGetDto> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return UserGetDto.fromUserEntity(user);
  }

  @Get()
  @ApiOkResponse({
    type: UserGetDto,
    isArray: true,
    description: 'Returns list of users',
  })
  // TODO: restrict only for admins, split in different controller
  async list(): Promise<UserGetDto[]> {
    // TODO: support filters & pagination
    return await this.usersService.find();
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Returns in case if user successfully updated',
  })
  @ApiNotFoundResponse({ description: 'User with specified id not found' })
  async update(
    @Param('id') id: string,
    @Body() payload: UserUpdateDto
  ): Promise<void> {
    if (!(await this.usersService.updateById(id, payload))) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Returns in case if user successfully removed',
  })
  @ApiNotFoundResponse({ description: 'User with specified id not found' })
  async delete(@Param('id') id: string): Promise<void> {
    if (!(await this.usersService.deleteById(id))) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}

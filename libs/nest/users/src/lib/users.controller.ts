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
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserUpdateDto } from '../dto/update.dto';
import { UserCreateDto } from '../dto/create.dto';
import { UserGetDto } from '../dto/get.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserGetDto })
  async create(@Body() payload: UserCreateDto): Promise<UserGetDto> {
    // TODO: handle duplication errors
    return this.usersService.create(payload);
  }

  @Get('/:id')
  @ApiOkResponse({ type: UserGetDto })
  @ApiNotFoundResponse({ description: 'User with specified id not found' })
  async get(@Param('id') id: string): Promise<UserGetDto> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Get()
  @ApiOkResponse({ type: UserGetDto, isArray: true })
  // TODO: restrict only for admins, split in different controller
  async list(): Promise<UserGetDto[]> {
    // TODO: support filters & pagination
    return await this.usersService.find();
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ description: 'User with specified id not found' })
  async patch(
    @Param('id') id: string,
    @Body() payload: UserUpdateDto
  ): Promise<void> {
    if (!(await this.usersService.updateById(id, payload))) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ description: 'User with specified id not found' })
  async delete(@Param('id') id: string): Promise<void> {
    if (!(await this.usersService.deleteById(id))) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}

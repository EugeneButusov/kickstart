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
import { ApiTags } from '@nestjs/swagger';
import { UserUpdateDto } from '../dto/update.dto';
import { UserCreateDto } from '../dto/create.dto';
import { UserGetDto } from '../dto/get.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() payload: UserCreateDto): Promise<UserGetDto> {
    // TODO: handle duplication errors
    return this.usersService.create(payload);
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<UserGetDto> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Get()
  async list(): Promise<UserGetDto[]> {
    // TODO: support filters & pagination
    return await this.usersService.find();
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
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
  async delete(@Param('id') id: string): Promise<void> {
    if (!(await this.usersService.deleteById(id))) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}

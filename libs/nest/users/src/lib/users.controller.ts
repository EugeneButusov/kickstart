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
import { User } from '../interfaces/user.interface';
import { UserModifyDto } from '../dto/create.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() payload: UserModifyDto): Promise<User> {
    return this.usersService.create(payload);
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async patch(
    @Param('id') id: string,
    @Body() payload: Partial<Omit<User, 'id'>>
  ): Promise<unknown> {
    if (!(await this.usersService.updateById(id, payload))) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<unknown> {
    if (!(await this.usersService.deleteById(id))) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return;
  }
}

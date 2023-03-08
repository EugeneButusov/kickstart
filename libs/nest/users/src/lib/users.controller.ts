import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../interfaces/user.interface';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() payload: User): Promise<User> {
    return this.usersService.create(payload);
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      // TODO: implement error handling
      throw new Error('user not found');
    }
    return user;
  }

  @Patch('/:id')
  async patch(@Param('id') id: string): Promise<unknown> {
    return { message: `user updated with ID ${id}` };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<unknown> {
    return { message: `user deleted with ID ${id}` };
  }
}

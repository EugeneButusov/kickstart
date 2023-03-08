import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() payload: unknown): Promise<unknown> {
    return { message: 'user created', data: payload };
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<unknown> {
    return { message: `user retrieved with ID ${id}` };
  }
}

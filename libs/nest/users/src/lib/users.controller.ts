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

@Controller('users')
@ApiTags('users')
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

  @Patch('/:id')
  async patch(@Param('id') id: string): Promise<unknown> {
    return { message: `user updated with ID ${id}` };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<unknown> {
    return { message: `user deleted with ID ${id}` };
  }
}

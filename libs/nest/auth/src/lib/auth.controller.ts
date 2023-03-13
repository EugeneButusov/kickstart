import { Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  @UseGuards(AuthGuard('local'))
  @Post('token')
  async token() {
    return { message: 'authorized' };
  }
}

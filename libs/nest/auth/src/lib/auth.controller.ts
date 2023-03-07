import { Controller, Logger, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  @Post('token')
  async token() {
    return { message: 'authorized' };
  }
}

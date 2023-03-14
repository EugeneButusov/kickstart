import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IssueTokenDto } from '../dto/issue-token.dto';
import { Authentication } from '@libs/nest/auth/interfaces/login-result.interface';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: IssueTokenDto })
  @ApiOkResponse({
    description: 'returns access token to use in authorized requests',
  })
  @ApiUnauthorizedResponse()
  async token(@Req() request: Request): Promise<Authentication> {
    return this.authService.authenticate(request.user);
  }
}

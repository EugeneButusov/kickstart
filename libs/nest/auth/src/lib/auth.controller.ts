import {
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: IssueTokenDto })
  @ApiOkResponse({
    description: 'returns access token to use in authorized requests',
  })
  @ApiUnauthorizedResponse()
  async token(@Req() request): Promise<Authentication> {
    return this.authService.login(request.user);
  }
}

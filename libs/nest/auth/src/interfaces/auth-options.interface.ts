import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

export type AuthModuleOptions = {
  jwt: JwtModuleOptions;
};

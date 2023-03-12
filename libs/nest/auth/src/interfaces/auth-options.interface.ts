import { ModuleMetadata, Provider, Type } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

export type AuthModuleOptions = {
  jwt: JwtModuleOptions;
};

export interface AuthOptionsFactory {
  createAuthOptions(): Promise<AuthModuleOptions> | AuthModuleOptions;
}

export interface AuthModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<AuthOptionsFactory>;
  useClass?: Type<AuthOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AuthModuleOptions> | AuthModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}

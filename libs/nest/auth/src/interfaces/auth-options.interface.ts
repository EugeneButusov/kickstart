import { ModuleMetadata, Provider, Type } from '@nestjs/common';

export type AuthModuleOptions = {
  jwt: {
    secret: string;
  };
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

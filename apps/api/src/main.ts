/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './interfaces/app-config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>(AppModule.name);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // set up OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Kickstart API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  await app.listen(appConfig.port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${appConfig.port}/${globalPrefix}`
  );
}

bootstrap();

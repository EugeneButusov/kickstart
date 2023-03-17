import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './interfaces/app-config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(ConfigService).get<AppConfig>(AppModule.name);

  app.setGlobalPrefix(appConfig.globalPrefix);

  // set up OpenAPI
  const config = new DocumentBuilder()
    .setTitle(appConfig.appName)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(appConfig.globalPrefix, app, document);

  await app.listen(appConfig.port);
  Logger.log(
    `🚀 Application is running on: ${appConfig.secure ? 'https' : 'http'}://${
      appConfig.host
    }:${appConfig.port}/${appConfig.globalPrefix}`
  );
}

bootstrap();

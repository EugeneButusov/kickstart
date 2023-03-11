import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersModule, UsersService } from '../src';

xdescribe('Users (e2e)', () => {
  let app: INestApplication;
  const usersService = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
});

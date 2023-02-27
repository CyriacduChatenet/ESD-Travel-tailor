import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    allowedHeaders: 'Authorization, Content-Type',
  };

  app.enableCors(corsOptions);
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.API_PORT);
}
bootstrap();

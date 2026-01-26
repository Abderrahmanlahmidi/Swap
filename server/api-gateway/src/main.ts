import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
  console.log(`API Gateway is running on: http://localhost:${process.env.PORT ?? 3001}`);
}

bootstrap()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.DATABASE_URL ?? 3004);
  console.log(`Order service is running on: ${await app.getUrl()}`);
}
bootstrap();

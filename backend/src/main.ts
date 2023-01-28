import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}`);
}
bootstrap();

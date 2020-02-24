import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(14377);
  console.log('Server is listening on port ' + 14377)
}
bootstrap();

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.enableCors()
  const PORT = 14377
  await app.listen(PORT)
  console.log('Server is listening on port ' + PORT)
}
bootstrap()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Включаем CORS для связи с React-приложением
  app.enableCors();
  
  // Запускаем сервер на порту 5000
  await app.listen(5000);
  console.log('Сервер успешно запущен на http://localhost:5000');
}
bootstrap();

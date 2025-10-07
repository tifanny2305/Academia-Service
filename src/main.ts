import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global de API
  app.setGlobalPrefix('api');

  // Pipes globales para validación DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Habilitar CORS si lo necesitas
  app.enableCors({
    origin: '*',
  });

  // Puerto de escucha
  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Microservicio Perfil corriendo en http://localhost:${port}/api`);
}

bootstrap();

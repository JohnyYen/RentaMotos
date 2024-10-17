import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const option = new DocumentBuilder()
  .setTitle('API Renta de Motos')
  .setDescription("Documentación para la API de Renta de Motos")
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, option);

  SwaggerModule.setup('api/docs', app, document);

  app.enableCors();
  
  await app.listen(3000);
}
bootstrap();

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwtAuthGuard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  const option = new DocumentBuilder()
  .setTitle('API Renta de Motos')
  .setDescription("Documentación para la API de Renta de Motos")
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, option);

  SwaggerModule.setup('api/docs', app, document);

  app.enableCors();
  
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Setup Swagger/OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Bookstore API')
    .setDescription('A comprehensive bookstore management system API')
    .setVersion('1.0')
    .addTag('authors', 'Author management endpoints')
    .addTag('categories', 'Category management endpoints')
    .addTag('books', 'Book management endpoints')
    .addTag('orders', 'Order management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`API Documentation available at http://localhost:${process.env.PORT ?? 3000}/api/docs`);
}
bootstrap();

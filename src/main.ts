import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service'; // Adjust this import based on the actual location of your PrismaService

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ChatApp API')
    .setDescription('API Docs for ChatApp')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Database connection logic with try-catch
  const prismaService = app.get(PrismaService); // Ensure PrismaService is properly registered in your AppModule

  try {
    await prismaService.$connect();
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1); // Exit the application if the connection fails
  }

  await app.listen(3000);
}
bootstrap();

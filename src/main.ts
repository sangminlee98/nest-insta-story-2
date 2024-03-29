import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ---------------------------- Swagger 설정 ----------------------------
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('어쩌다 Nest 과제 API')
    .setVersion('1.0')
    .build();
  const swaggerOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  // TODO: 프로그램 구현
  await app.listen(process.env.PORT || 8000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

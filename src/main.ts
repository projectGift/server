import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from './common/Exceptions/httpExceptionFilter';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { config } from './common/config/swaggerconfig';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  const documentation: OpenAPIObject = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup('docs', app, documentation);

  await app.listen(process.env.PORT);
}

bootstrap();

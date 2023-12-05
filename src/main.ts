import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import { AppModule } from './app.module';
import { ErrorsInterceptor } from './interceptors/error.interceptor';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { HttpExceptionFilter } from './utils/http-exception.utils';
import * as admin from 'firebase-admin/app';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../serviceAccountKey');

async function bootstrap() {
  admin.initializeApp({
    credential: admin.cert(serviceAccount),
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useStaticAssets(path.join(__dirname, '../files'));

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggerInterceptor(), new ErrorsInterceptor());

  const configSwagger: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Api Ecommerce')
    .setDescription(` swagger API documentation`)
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    configSwagger,
  );
  SwaggerModule.setup('api', app, document);
  await app.listen(8080);
}
bootstrap();

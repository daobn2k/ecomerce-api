import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ErrorsInterceptor } from './interceptors/error.interceptor';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { HttpExceptionFilter } from './utils/http-exception.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

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

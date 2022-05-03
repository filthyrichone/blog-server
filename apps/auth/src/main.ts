import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(cookieParser());
  app.enableCors({
    origin: new RegExp('.hyong1232.com'),
    credentials: true,
  });
  const conf = new DocumentBuilder()
    .setTitle('auth api')
    .setVersion('1.0.0')
    .setDescription("auth's api doc")
    .build();
  const doc = SwaggerModule.createDocument(app, conf);
  SwaggerModule.setup('auth', app, doc);
  await app.listen(8082);
  console.log('auth service start on auth.hyong1232.com:8082');
}
bootstrap();

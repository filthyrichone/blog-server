import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { GlobalAuthorizationGuard } from './guard/globalGuardAuthorization';
    
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // origin: true,
    origin: new RegExp('hyong1232.com'),
    credentials: true,
  });
  app.use(cookieParser())
//   app.useGlobalGuards(new GlobalAuthorizationGuard())
  app.setGlobalPrefix('/web');
  const docConf = new DocumentBuilder()
  .setTitle('blog web api')
  .setDescription('api of blog web user')
  .setVersion('1.0.0')
  .build();
  const doc = SwaggerModule.createDocument(app, docConf);
  SwaggerModule.setup('web', app, doc);
  await app.listen(8084, 'api.beta.blog.hyong1232.com');
  console.log('server start at http://api.beta.blog.hyong1232.com:8084/web');
}
bootstrap();

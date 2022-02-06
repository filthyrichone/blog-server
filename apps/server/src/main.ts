import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const docConf = new DocumentBuilder()
  .setTitle('blog web api')
  .setDescription('api of blog web user')
  .setVersion('1.0.0')
  .build();
  const doc = SwaggerModule.createDocument(app, docConf);
  SwaggerModule.setup('web', app, doc);
  await app.listen(8081);
  console.log('server start at http://localhost:8081/web');
}
bootstrap();

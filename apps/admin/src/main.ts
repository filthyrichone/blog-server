import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminModule } from './admin.module';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.enableCors();
  const conf = new DocumentBuilder()
  .setTitle('blog admin api')
  .setDescription('the blog\'s api doc')
  .setVersion('1.0.0')
  .build();
  app.setGlobalPrefix('admin')
  const doc = SwaggerModule.createDocument(app, conf);
  SwaggerModule.setup('admin', app, doc);
  await app.listen(8086);
  console.log('server is listening at http://localhost:8086/admin')
}
bootstrap();

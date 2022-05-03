import { DbModule } from '@db/db';
import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ServeStaticModule } from "@nestjs/serve-static";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { ReplyModule } from './reply/reply.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { join } from 'path';
import { LikeModule } from './like/like.module';
import { UserInfoMiddleware } from './middleware/userInfo.middleware';

@Module({
  imports: [
    CommentsModule,
    DbModule,
    ReplyModule,
    ArticleModule,
    UserModule,
    ConfigModule.forRoot({
        isGlobal: true
    }),
    ServeStaticModule.forRoot({
        serveRoot: '/imgs',
        rootPath: join(__dirname, '..', 'imgs'),
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (confService: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: confService.get('REDIS_HOST'),
        port: confService.get('REDIDS_PORT'),
        ttl: confService.get('CACHE_TTL'),
      }),
      inject: [ConfigService],
    }),
    UploadModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserInfoMiddleware, AuthMiddleware)
      .exclude(
        '/imgs(.*)',
        '/web/article(.*)',
        { path: 'web/upload(.*)',method: RequestMethod.POST },
        { path: 'web/comment(.*)',method: RequestMethod.GET },
        { path: 'web/reply(.*)', method: RequestMethod.GET },
      )
      .forRoutes('/*');
  }
}

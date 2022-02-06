import { DbModule } from '@db/db';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { ReplyModule } from './reply/reply.module';

@Module({
  imports: [CommentsModule, DbModule, ReplyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

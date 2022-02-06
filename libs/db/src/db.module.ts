import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { DbService } from './db.service';
import { Article } from './models/article.model';
import { Comments } from './models/comments.model';
import { Replay } from './models/reply.model';
import { User } from './models/users.model';

const models = TypegooseModule.forFeature([User, Article, Comments, Replay]);

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),    
    TypegooseModule.forRoot('mongodb://127.0.0.1:27017/blog',{}),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}

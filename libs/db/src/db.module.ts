import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { DbService } from './db.service';
import { Article } from './models/article.model';
import { Category } from './models/category.model';
import { Comments } from './models/comments.model';
import { Like } from './models/likes.model';
import { LoginInfo } from './models/loginInfo.model';
import { Reply } from './models/reply.model';
import { Tag } from './models/tag.model';
import { User } from './models/users.model';

const models = TypegooseModule.forFeature([User, Article, Comments, Reply, LoginInfo, Like, Category, Tag]);

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

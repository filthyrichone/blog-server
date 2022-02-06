import { DbModule } from '@db/db';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';
import { ArticleController } from './article/article.controller';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    DbModule,
    UsersModule,
    ArticleModule,
  ],
  controllers: [AdminController, ArticleController],
  providers: [AdminService],
})
export class AdminModule {}

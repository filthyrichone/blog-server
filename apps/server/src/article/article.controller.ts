import { Article } from '@db/db/models/article.model';
import { Controller, Get, Param } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { Model } from "mongoose";

@Crud({
    model: Article
})
@Controller('article')
export class ArticleController {
    constructor(@InjectModel(Article) private readonly model: Model<Article>){}

    @Get('/:id')
    async test(@Param('id') id: string) {
        return await this.model.findById(id).populate(['author', 'category', 'tag']).exec();
    }
}

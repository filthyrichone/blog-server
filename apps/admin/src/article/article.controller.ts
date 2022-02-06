import { Article } from '@db/db/models/article.model';
import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model: Article
})
@Controller('article')
export class ArticleController {
    constructor(@InjectModel(Article)private readonly model){}
}

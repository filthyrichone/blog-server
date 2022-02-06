import { Comments } from '@db/db/models/comments.model';
import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model: Comments
})
@Controller('comments')
export class CommentsController {
    constructor(@InjectModel(Comments)private readonly model) {}
}

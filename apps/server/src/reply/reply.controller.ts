import { Replay } from '@db/db/models/reply.model';
import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model: Replay
})
@Controller('reply')
export class ReplyController {
    constructor(@InjectModel(Replay)private readonly model){}
}

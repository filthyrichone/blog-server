import { Reply } from '@db/db/models/reply.model';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { Model } from 'mongoose';

@Crud({
  model: Reply,
})
@Controller('reply')
export class ReplyController {
  constructor(@InjectModel(Reply) private model: Model<Reply>) {}

  @Get('/:commentId')
  async replyByCommentId(@Param('commentId') id: string, @Query() query) {
    const { pageSize = 10, pageNo } = query;
    const total = await this.model
      .find()
      .where('commentId')
      .equals(id)
      .count()
      .exec()
    const res = await this.model
      .find()
      .where('commentId')
      .equals(id)
      .populate(['toUid', 'fromUid', 'likeCount'])
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .sort({ updatedAt: -1 })
      .exec()
    return {data: res, total};
  }
}

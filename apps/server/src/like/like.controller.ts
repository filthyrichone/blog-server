import { Like } from '@db/db/models/likes.model';
import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Model } from 'mongoose';
import { Crud } from 'nestjs-mongoose-crud';
import { Reply } from '@db/db/models/reply.model';
import { Comments } from '@db/db/models/comments.model';

@Crud({
  model: Like,
})
@Controller('like')
export class LikeController {
  constructor(
    @InjectModel(Like) private readonly model: Model<Like>,
    @InjectModel(Comments) private readonly comment: Model<Comments>,
    @InjectModel(Reply) private readonly reply: Model<Reply>,
  ) {}

  @Post('action')
  async action(@Body() body: Like) {
    const { article, comment, reply, user, likeType } = body;
    const like = await this.model
      .findOne({ user, article })
      .or([{ comment, reply }])
      .exec();
    let res;
    let isActive = false;
    if (like) {
        isActive = like.likeType !== likeType
      res = await this.model.findByIdAndUpdate(like._id, body).exec();
    } else {
      res = await this.model.create(body);
    }
    if (reply) {
        const res = await this.model.find({reply, article, likeType: 1}).count().exec();
        await this.reply.findByIdAndUpdate(reply, {like: res})
    } else {
        const res = await this.model.find({comment, article, likeType: 1}).count().exec();
        await this.comment.findByIdAndUpdate(comment, {like: res})
    }
    return { status: 'succss', code: 200 ,isActive};
  }
}

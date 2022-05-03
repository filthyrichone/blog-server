import { Comments } from '@db/db/models/comments.model';
import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { User } from '@db/db/models/users.model';

@Crud({
  model: Comments,
})
@Controller('comment')
export class CommentsController {
  constructor(
    @InjectModel(Comments) private readonly model: Model<Comments>,
    @InjectModel(User) private readonly user: Model<User>,
  ) {}

  @Get('/:id')
  async findCommentByArticleId(@Param('id') id, @Query() query, @Req() req) {
    let user: any = {};
    if (req.cookies && req.cookies.token) {
      const { user: id }: any = jwt.verify(req.cookies.token, 'slat');
      user = await this.user.findOne().where('_id').equals(id).exec();
    }
    let sortCondition: any = {};
    if (query.sortBy) {
      sortCondition[query.sortBy] = -1;
    } else {
      sortCondition.like = -1;
    }
    console.log(user._id);

    const res = await this.model
      .find()
      .where('articleId')
      .equals(id)
      .populate([
        'user',
        'replyCount',
        {
          path: 'likeCount',
          match: { user: user._id, likeType: {$gt: 0} },
        },
        {
          path: 'replys',
          options: {
            limit: 3,
            sort: sortCondition,
          },
          populate: [
            'toUid',
            'fromUid',
            { path: 'likeCount', match: { user: user._id , likeType: {$gt: 0}} },
          ],
        },
      ])
      .limit(20)
      .sort(sortCondition)
      .exec();
    return res;
  }
}

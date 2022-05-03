import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, Prop, Ref } from '@typegoose/typegoose';
import { Comments } from './comments.model';
import { Like } from './likes.model';
import { User } from './users.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
})
export class Reply {
  @ApiProperty({ description: '回复的回复' })
  @Prop({ required: false, ref: () => Reply, example: '_id' })
  replyId: Ref<Reply>;

  @ApiProperty({ description: '回复的评论', example: '_id' })
  @Prop({ required: true, ref: () => Comments })
  commentId: Ref<Comments>;

  @ApiProperty({ description: '回复者', example: '_id' })
  @Prop({ required: true, ref: () => User })
  fromUid: Ref<User>;

  @ApiProperty({ description: '被回复人', example: '_id' })
  @Prop({ required: true, ref: () => User })
  toUid: Ref<User>;

  // TODO评论类型字典创建完善:comment reply
  @ApiProperty({ description: '评论类型', example: 'comment' })
  @Prop({ required: true })
  replyType: string;

  @ApiProperty({ description: '回复内容', example: 'this is a reply' })
  @Prop({
    required: true,
    limit: 300,
  })
  content: string;

  @Prop({default: 0})
  like?: number;

  @Prop({
    ref: () => Like,
    foreignField: 'reply',
    localField: '_id',
    justOne: false,
    count: true
  })
  public likeCount: Ref<Like>;
}

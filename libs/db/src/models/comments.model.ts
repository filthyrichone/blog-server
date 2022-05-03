import { ApiProperty } from "@nestjs/swagger";
import { ModelOptions, Prop, Ref } from "@typegoose/typegoose";
import { Article } from "./article.model";
import { Reply } from "./reply.model";
import { User } from "./users.model";
import { Types } from "mongoose";
import { Like } from "./likes.model";

@ModelOptions({
    schemaOptions: {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
})
export class Comments {

    @Prop({
        required: false,
    })
    commentId: string;

    @Prop()
    isVisible: boolean;

    @Prop({default:0})
    like: number;

    @ApiProperty({description: '用户id',required: true, example: '001'})
    @Prop({
        required: true,
        ref: 'User'
    })
    user: Ref<User>

    @ApiProperty({description: '文章id',required: true, example: '001'})
    @Prop({
        ref: 'Article',
        required: true,
    })
    articleId: Ref<Article>
    
    @ApiProperty({description: '评论内容', example: 'that\'s good news! ', required: true})
    @Prop({
        limit: '300',
        required: true
    })
    content: string;

    @Prop({
        ref: () => Reply,
        foreignField: 'commentId',
        localField: '_id',
        justOne: false,
    })
    public replys: Ref<Reply>[]

    @Prop({
        ref: () => Reply,
        foreignField: 'commentId',
        localField: '_id',
        justOne: false,
        count: true
    })
    public replyCount: Ref<Reply>[]

    @Prop({
        ref: () => Like,
        foreignField: 'comment',
        localField: '_id',
        justOne: false,
        count: true
    })
    likeCount: Ref<Like>;

    // @Prop({
    //     ref: () => Article,
    //     foreignField: 'comments',
    //     localField: '_id',
    //     justOne: false,
    // })
    // public articles: Ref<Article>

}
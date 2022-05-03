import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, Prop, Ref } from "@typegoose/typegoose";
import { Article } from "./article.model";
import { Comments } from "./comments.model";
import { Reply } from "./reply.model";
import { User } from "./users.model";

enum LikeTypeEnum {
    UNLIKE,
    LIKE
}

enum LikeTargetEnum {
    ARTICLE ='Article',
    COMMENT = 'Comments',
    REPLY = 'Reply',
}

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Like {

    @ApiProperty({description: 'userid', example: '625b8f54f711d83452f4ad3a'})
    @Prop({required: true, ref: () => User})
    user!: Ref<User>

    @ApiProperty({description: 'replyId', example: '625b910049f3838dedfb85c4'})
    @Prop({ref: () => Reply})
    reply?: Ref<Reply>

    @ApiProperty({description: 'replyId', example: '625b814949f3838dedfb83d9'})
    @Prop({ref: () => Comments})
    comment?: Ref<Comments>

    @ApiProperty({description: 'replyId', example: '62528b09d5ea787435d43203'})
    @Prop({ref: () => Article})
    article?: Ref<Article>

    // @Prop({required: true, enum: LikeTargetEnum})
    // which!: string

    // @Prop({refPath: 'which'})
    // likeTarget!: Ref<Article | Comments | Reply>;

    @ApiProperty({description: 'likeType', example: 1})
    @Prop({enum: LikeTypeEnum})
    likeType!: LikeTypeEnum;
    
}
import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, Prop, Ref } from "@typegoose/typegoose";
import { User } from "./users.model";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Replay {

    @Prop({required: false})
    id: string;

    @Prop({required: false})
    replyId: string;
    
    @ApiProperty({description: '回复的评论'})
    @Prop({required: true})
    commentId: Ref<Comment>; 
    
    @ApiProperty({description: '回复者'})
    @Prop({required: true})
    fromUid: Ref<User>;

    @ApiProperty({description: '被回复人'})
    @Prop({required: true})
    toUid: Ref<User>;

    // TODO评论类型字典创建完善:comment reply
    @ApiProperty({description: '评论类型', example: 'comment'})
    @Prop({required: true})
    replyType: string;

    @ApiProperty({description: '回复内容', example: 'this is a reply'})
    @Prop({
        required: true,
        limit: 300,
    })
    content: string;
}
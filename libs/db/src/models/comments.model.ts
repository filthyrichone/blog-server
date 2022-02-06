import { ApiProperty } from "@nestjs/swagger";
import { ModelOptions, Prop, Ref } from "@typegoose/typegoose";
import { Article } from "./article.model";
import { User } from "./users.model";

@ModelOptions({
    schemaOptions: {
        timestamps: true,
    }
})
export class Comments {

    @Prop({required: false})
    id: string;

    @Prop({
        required: false,
    })
    commentId: string;

    @Prop({
        required: false,
        ref: 'User'
    })
    user: Ref<User>

    @Prop({
        ref: 'Article',
        required: false,
    })
    articleId: Ref<Article>
    
    @ApiProperty({description: '评论内容', example: 'that\'s good news! ', required: true})
    @Prop({
        limit: '300',
        required: true
    })
    content: string;

}
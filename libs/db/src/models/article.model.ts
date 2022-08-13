import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, Prop, Ref } from "@typegoose/typegoose";
import { Category } from "./category.model";
import { Tag } from "./tag.model";
import { User } from "./users.model";

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        }
    }
})
export class Article {
    @ApiProperty({description: '文章标题', example: 'quest of archlinux'})
    @Prop()
    title: string;

    @Prop({ref: () => Tag})
    tag?: Ref<Tag>[]

    @Prop({ref: () => Category})
    category?: Ref<Category>

    @ApiProperty({description: '文章摘要', example: 'accrodding our detect, we find the left-hand user more smart that normal gays.'})
    @Prop()
    summary: string;

    @ApiProperty({description: '文章内容链接', example: '/scenitist/smartGuys'})
    @Prop()
    url: string;

    @ApiProperty({description: '作者', example: 'noah'})
    @Prop({ref: () => User, required: true})
    author: Ref<User>;

    @ApiProperty({description: '封面图', example: 'http:example.com/example'})
    @Prop() 
    coverImage?: string;

}
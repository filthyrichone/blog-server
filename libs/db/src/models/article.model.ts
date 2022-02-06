import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, Prop } from "@typegoose/typegoose";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Article {
    @ApiProperty({description: '文章标题', example: 'quest of archlinux'})
    @Prop()
    title: string;

    @ApiProperty({description: '文章摘要', example: 'accrodding our detect, we find the left-hand user more smart that normal gays.'})
    @Prop()
    summary: string;

    @ApiProperty({description: '文章内容链接', example: '/scenitist/smartGuys'})
    @Prop()
    content: string;

    @ApiProperty({description: '作者', example: 'noah'})
    @Prop()
    author: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, Prop } from "@typegoose/typegoose";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class User {
    @ApiProperty({description: '用户名', example: 'noah'})
    @Prop()
    username: string;

    @ApiProperty({description: '密码', example: '123456'})
    @Prop()
    password: string;

    @ApiProperty({description: '昵称', example: 'nickname'})
    @Prop()
    nickName: string;

    @ApiProperty({description: '头像', example: 'https://example.com/avatar.png'})
    @Prop()
    avatar: string;

    @ApiProperty({description: '个性签名', example: '我自飘零我自狂'})
    @Prop()
    describe: string;

    @ApiProperty({description: '用户等级', example: 0})
    @Prop()
    grade: number;
}
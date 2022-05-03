import { ApiProperty } from "@nestjs/swagger";
import * as bcrypt from "bcrypt";
import { modelOptions, Prop } from "@typegoose/typegoose";

@modelOptions({
    schemaOptions: {
        timestamps: true,
    }
})
export class User {
    @ApiProperty({description: '用户名', example: 'noah'})
    @Prop()
    username!: string;

    @ApiProperty({description: '密码', example: '123456'})
    @Prop({set(val){return bcrypt.hashSync(val, 10)}, get(val) {return val}, select: false})
    password!: string;

    @ApiProperty({description: 'user email', example: 'hyong1232@163.com'})
    @Prop()
    email?: string;

    @ApiProperty({description: '头像', example: 'https://example.com/avatar.png'})
    @Prop()
    avatar?: string;

    @Prop({default: false})
    isMemembership: boolean;

    @ApiProperty({description: '个性签名', example: '我自飘零我自狂'})
    @Prop()
    signature?: string;

    @ApiProperty({description: '个人简介', example: 'a verty good person'})
    @Prop()
    description?: string;

    @ApiProperty({description: '出生日期', example: '2000-02-05'})
    @Prop()
    brithday?: string;

    @ApiProperty({description: '性别', example: '男'})
    @Prop()
    gender?: string;

    @Prop({default: 0})
    experience?: number;

    @Prop({default: 1})
    grade?: number;
}
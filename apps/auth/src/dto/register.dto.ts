import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({description: 'user nickname', example: 'noah'})
    readonly username!: string;

    @ApiProperty({description: 'user password', example: '123'})
    readonly password!: string;
}
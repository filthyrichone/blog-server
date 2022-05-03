import { User } from '@db/db/models/users.model';
import { Body, Controller, Get, Param, Put, Req, Res } from '@nestjs/common';
import { Model } from 'mongoose';
import { Request } from 'express';
import { InjectModel } from 'nestjs-typegoose';
import { ApiBody } from '@nestjs/swagger';

@Controller('user')
export class UserController {

    constructor(@InjectModel(User) private readonly model: Model<User>) {}

    @Get('info/:id')
    userInfoById(@Param('id') id: string) {
        return this.model.findById(id).exec()
    }

    @Get('info')
    userInfo(@Req() req: Request) {
        return (req as any).user;
    }

    @Put('info/:id')
    async updateUserInfo(@Param('id') id: string, @Body() body: User) {
        const res = await this.model.findByIdAndUpdate(id, body, {upsert: true})
        return res;
    }
}

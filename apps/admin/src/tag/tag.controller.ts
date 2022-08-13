import { Tag } from '@db/db/models/tag.model';
import { Body, Controller, Delete, Param, Post, Put, Req } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { Model } from "mongoose";
import { query } from 'express';

@Crud({
    model: Tag
})
@Controller('tag')
export class TagController {
    constructor(@InjectModel(Tag) private readonly model: Model<Tag>) {}

    @Post('/batchdelete')
    async batchDelete(@Body() ids: string[]) {
        await this.model.deleteMany({_id:{ $in : ids}}).exec();
        return {message: 'batch delete success', code: 200}
    }

    @Put("/")
    async create(@Body() body) {
        if (body._id) {
            await this.model.findByIdAndUpdate(body._id, {$set: body}, {new: true}).exec();
        } else {
            if (!body.pid) {
                delete body.pid;
            }
            await this.model.create({
                ...body});
        }
        return {message: 'success', code: 200}
    }
}

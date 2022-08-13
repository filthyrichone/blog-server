import { Category } from '@db/db/models/category.model';
import { Body, Controller, Post, Put } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { Model } from "mongoose";

@Crud({
    model: Category
})
@Controller('category')
export class CategoryController {
    constructor(@InjectModel(Category) private readonly model: Model<Category>) {}

    @Post('/batchdelete')
    async batchDelete(@Body() ids: string[]) {
        await this.model.deleteMany().where('id').in(ids).exec();
        return {message: 'batch delete success', code: 200}
    }

    @Put("/")
    async create(@Body() body) {
        if (body._id) {
            await this.model.findByIdAndUpdate(body._id, body).exec();
        } else {
            if (!body.pid) {
                delete body.pid;
            }
            await this.model.create(body);
        }
        return {message: 'success', code: 200}
    }
}

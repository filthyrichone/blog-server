import { Article } from '@db/db/models/article.model';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { Model } from 'mongoose';

@Crud({
  model: Article,
})
@Controller('article')
export class ArticleController {
  constructor(@InjectModel(Article) private readonly model: Model<Article>) {}

  @Post('/batchdelete')
  async batchDelete(@Body() ids: string[]) {
    await this.model.deleteMany().where('_id').in(ids).exec();
    return { message: 'batch delete success', code: 200 };
  }

  @Post('/')
  async saveRecord(@Body() body) {
    const temp = {};
    Object.keys(body).map((v) => {
      if (body[v]) {
        temp[v] = body[v];
      }
    });
    return await this.model.create(temp);
  }

  @Get('/search')
  async search(@Query() query) {
    const searchText = new RegExp(`.*${query.search}.*`);
    const { pageIndex = 1, pageSize = 20, sort = '-createdAt' } = query;
    return await this.model
        .aggregate([
          {
            $lookup: {
              from: 'Category',
              localField: 'category',
              foreignField: '_id',
              as: 'category',
            },
          },
          {
            $lookup: {
              from: 'Tag',
              localField: 'tag',
              foreignField: '_id',
              as: 'tag',
            },
          },
          {
            $match: {
              $or: [{ title: searchText }, { summary: searchText }],
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              name: {$push: 'tag'},
            },
          },
          {
              $project: {
                  _id: 0,
              },
          },
          {
            $project: {
              data: '$$ROOT',
            },
          },
        ])
    //   .find({ $or: [{ summary: searchText }, { title: searchText }] })
    //   .populate([
    //     { path: 'tag', match: { name: searchText } },
    //     { path: 'category', match: { name: searchText } },
    //   ])
      .limit(pageSize)
      .skip((pageIndex - 1) * pageSize)
      .sort(sort)
      .exec();
  }

  @Put('/')
  async create(@Body() body) {
    if (body._id) {
      await this.model.findByIdAndUpdate(body._id, body).exec();
    } else {
      if (!body.pid) {
        delete body.pid;
      }
      await this.model.create(body);
    }
    return { message: 'success', code: 200 };
  }

//   @Get("/")
//   async findAll(@Query() query) {

//       const articleArr = await this.model.find(query).populate({path: 'tag'}).exec();
//       for (const item of articleArr) {
//           await item.populate('tag', 'name');
//       }
//       return articleArr;
//   }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return await this.model.findById(id).exec();
  }
}

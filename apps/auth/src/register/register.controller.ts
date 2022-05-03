import { User } from '@db/db/models/users.model';
import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';

@Controller('register')
export class RegisterController {
    constructor(@InjectModel(User) private readonly model) {}

    @Post('/')
    async register(@Body() body: RegisterDto) {
        try {
            const user = await this.model.findOne()
              .where('username').equals(body.username).exec();
            if (user?._id) {
                return {msg: 'there has been seem name', status: 'error'}
            }
            const res = await this.model.create(body);
            return {msg: 'register sucess', status: 'success'};
        } catch (error) {
            throw new HttpException({error, msg: 'register failed'}, 500)
        }
    }

}

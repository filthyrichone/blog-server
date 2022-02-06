import { User } from '@db/db/models/users.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User)private readonly model){}

    async addUser(user: User): Promise<any> {
        const createdUser =  new this.model(user)
        return await createdUser.save();
    }
    
    async findAllUser(): Promise<any> {
        return this.model.find().exec();
    }
}

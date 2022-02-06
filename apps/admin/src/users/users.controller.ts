import { User } from '@db/db/models/users.model';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService){}

    @Get()
    async findAll() {
        return await this.service.findAllUser();
    }

    @Post()
    async addUser(@Body() user: User) {
        return await this.service.addUser(user);
    }
}

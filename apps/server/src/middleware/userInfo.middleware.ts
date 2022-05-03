import { User } from "@db/db/models/users.model";
import { Injectable, NestMiddleware } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { Model } from "mongoose";
import { InjectModel } from "nestjs-typegoose";

@Injectable()
export class UserInfoMiddleware implements NestMiddleware {

    constructor(@InjectModel(User) private readonly model: Model<User>){}

    async use(req: any, res: any, next: () => void) {
        if (!req.cookies || !req.cookies.token) {
            next();
            return;
        }
        const {user: id}: any = jwt.verify(req.cookies.token, 'slat')
        const user = await this.model.findOne().where('_id').equals(id).exec();
        req.user = user;
        next();
    }
    
}
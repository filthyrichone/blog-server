import { User } from "@db/db/models/users.model";
import { CACHE_MANAGER, HttpException, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { InjectModel } from "nestjs-typegoose";
import * as jwt from 'jsonwebtoken';
import { Cache } from "cache-manager";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(@InjectModel(User)private readonly model,@Inject(CACHE_MANAGER)private cacheManager: Cache) {}

    async use(req: Request, res: Response, next: NextFunction) {
        if (!(req as any).user) {
            throw new HttpException({msg: 'please singin', status: 'failed'}, 401);
        } 
        const tokenstr = await this.cacheManager.get('token') as string;
        if(tokenstr?.includes(req.cookies.token)){
            throw new HttpException({msg: 'login info has expired, please login again', status: 'failed'}, 401)
        }
        next();
    }

} 
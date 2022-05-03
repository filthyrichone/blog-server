import { InjectModel } from 'nestjs-typegoose';
import { Body, Controller, Get, Header, HttpException, Post, Res } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from '@db/db/models/users.model';
import { RegisterDto } from '../dto/register.dto';
import { LoginInfo } from '@db/db/models/loginInfo.model';
import { Model } from "mongoose";

@Controller('login')
export class LoginController {
    constructor(@InjectModel(User) private readonly model: Model<User>) {}

    @Post('/')
    @Header('Cache-Control', 'max-age=60')
    async getHello(@Body() body: RegisterDto, @Res() res){
      const user = await this.model.findOne().populate({path: 'password'}).where('username').equals(body.username).exec();
      if (!user) {
        throw new HttpException({msg: 'username or password error', status: 'failed'}, 401);
      }
      const isCorrectPwd = bcrypt.compareSync(body.password, user.password);
      if (!isCorrectPwd) {
        throw new HttpException({msg: 'username or password error', status: 'failed'}, 401);
      }
      const token = jwt.sign({user: user._id}, 'slat', {expiresIn: '24h'})
      res.cookie('token', token, {
          domain: '.hyong1232.com',
          path: '/',
          expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
          'same-site': 'None',
          // Secure: 'true'
      })
      res.send({msg: 'login success', status: 'success'});
    }

}

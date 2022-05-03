import {
    Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Header,
  HttpException,
  Inject,
  Post,CacheStore, Res, Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Cache } from 'cache-manager';
import { InjectModel } from 'nestjs-typegoose';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from '@db/db/models/users.model';
import { RegisterDto } from './dto/register.dto';
import { LoginInfo } from '@db/db/models/loginInfo.model';
import { Model } from "mongoose";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectModel(LoginInfo) private readonly loginInfoModel: Model<LoginInfo>,
    @InjectModel(User) private readonly model: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('/login')
  @Header('Cache-Control', 'max-age=60')
  async login(@Body() body: RegisterDto, @Res() res){
    const user = await this.model.findOne().populate({path: 'password'}).where('username').equals(body.username).exec();
    if (!user) {
      throw new HttpException({msg: 'username or password error', status: 'failed'}, 401);
    }
    const isCorrectPwd = bcrypt.compareSync(body.password, user.password);
    if (!isCorrectPwd) {
      throw new HttpException({msg: 'username or password error', status: 'failed'}, 401);
    }
    const lf = await this.loginInfoModel.findOne().where('user').equals(user._id).exec();
    if(lf) {
        const lastDate = new Date((lf as any).updatedAt).getDate();
        const today = new Date().getDate();
        if (today !== lastDate) {
            const updateInfo = this.authService.grade(user.experience, user.grade);
            this.model.findByIdAndUpdate(user._id, updateInfo).exec();
        }
        await this.loginInfoModel.findByIdAndUpdate(lf._id, {user: user._id});
    } else {
        await this.loginInfoModel.create({user: user._id, loginType: 'web', loginAddress: 'local'});
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

  @Get('logout')
  async logout(@Req() res) {
    try {
      const token = res.cookies['token'];
      let temp = await this.cacheManager.get('token');
      if (!temp || !(temp as string).includes(token)) {
        temp = temp ? temp + ';' + token : token ;
        await this.cacheManager.set('token', temp);
      }
      return { status: 200, msg: 'logout sucess' };
    } catch (error) {
      console.error(error);
      return { status: 500, msg: 'logout error', reason: error };
    }
  }

  @Get()
  async getHello() {
    await this.cacheManager.set('name', 'peter');
    const str = await this.cacheManager.get('name');
    return str;
  }
}

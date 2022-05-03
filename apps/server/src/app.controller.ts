import { User } from '@db/db/models/users.model';
import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel(User) private readonly model,
  ) {}

}

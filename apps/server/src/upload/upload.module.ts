import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule, MulterModuleOptions } from '@nestjs/platform-express';
import {resolve} from 'path';
import { diskStorage } from "multer";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MulterModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (confService: ConfigService) => ({
            storage: diskStorage({
                destination:  resolve(__dirname, '..', confService.get('UPLOAD_PATH')),
                filename(req, file, cb){
                    cb(null, `${new Date().toISOString()}-${file.originalname}`)
                }
            }) 
        }) as MulterModuleOptions,
        inject: [ConfigService]
    }),
  ],
  controllers: [UploadController]
})
export class UploadModule {}

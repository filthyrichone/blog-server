import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from "express";
import { diskStorage } from "multer";
import { resolve } from 'path';

@Controller('upload')
export class UploadController {

    constructor(private confService: ConfigService){}

    @Post('avatar')
    @UseInterceptors(FileInterceptor('file'))
    uploadAvatar(@UploadedFile() file: Express.Multer.File) {
        const url = this.confService.get('DOMAIN_NAME') + `imgs/${file.filename}`
        return {url};
    }
}

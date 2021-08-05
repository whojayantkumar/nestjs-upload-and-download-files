import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { AppService } from './app.service';
import { editFileName, imageFileFilter } from './utils/file-uploading.utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   const response = {
  //     originalName: file.originalname,
  //     fileName: file.filename,
  //   };
  //   return file;
  // }
  //get image by filename
  @Get(':imagepath')
  getImageByPath(@Param('imagepath') image, @Res() res) {
    return res.sendFile(image, { root: './public' });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalName: file.originalname,
      fileName: file.filename,
      path: file.path,
    };
    return response;
  }
}

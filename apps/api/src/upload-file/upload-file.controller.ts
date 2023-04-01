import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileData, User as UserType } from '@travel-tailor/types';

import { User } from '../decorators/user.decorator';
import { UploadFileService } from './upload-file.service';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@UploadedFiles() files: FileData, @User() user: UserType) {
    console.log(files)
    return await this.uploadFileService.create(files, user);
  }
}

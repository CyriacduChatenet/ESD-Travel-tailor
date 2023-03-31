import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileData } from '@travel-tailor/types';

import { User } from '../decorators/user.decorator';
import { UploadFileService } from './upload-file.service';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@User() user, @UploadedFiles() files: FileData) {
    return await this.uploadFileService.create(user, files);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
import { UploadFile } from './entity/upload-file.entity';
import { UploadFileRepository } from './upload-file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UploadFile])],
  controllers: [UploadFileController],
  providers: [UploadFileRepository, UploadFileService],
  exports: [UploadFileService],
})
export class UploadFileModule {}

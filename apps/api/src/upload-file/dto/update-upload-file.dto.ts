import { PartialType } from '@nestjs/swagger';
import { CreateUploadFileDto } from './create-upload-file.dto';

export class UpdateUploadFileDto extends PartialType(CreateUploadFileDto) {}

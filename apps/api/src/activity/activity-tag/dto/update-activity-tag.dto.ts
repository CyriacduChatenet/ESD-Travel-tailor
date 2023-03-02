import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityTagDto } from './create-activity-tag.dto';

export class UpdateActivityTagDto extends PartialType(CreateActivityTagDto) {
  name: string;
}

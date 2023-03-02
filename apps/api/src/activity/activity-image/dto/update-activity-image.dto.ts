import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityImageDto } from './create-activity-image.dto';

export class UpdateActivityImageDto extends PartialType(
  CreateActivityImageDto,
) {
  source: string;
}

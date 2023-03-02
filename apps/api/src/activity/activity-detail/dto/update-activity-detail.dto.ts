import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDetailDto } from './create-activity-detail.dto';

export class UpdateActivityDetailDto extends PartialType(
  CreateActivityDetailDto,
) {
  duration: string;
  location: string;
}

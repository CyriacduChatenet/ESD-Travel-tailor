import { IsObject, IsString } from 'class-validator';

import { Advertiser } from '../advertiser/entities/advertiser.entity';
import { Traveler } from '../traveler/entities/traveler.entity';

export class UpdateUserDTO {
  @IsString()
  username?: string;

  @IsString()
  password?: string;

  @IsString()
  roles?: string;

  @IsObject()
  advertiser?: Advertiser;

  @IsObject()
  traveler?: Traveler;

  @IsObject()
  resetPasswordToken: Object;
}

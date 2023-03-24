import { Advertiser } from '../advertiser/entities/advertiser.entity';
import { Traveler } from '../traveler/entities/traveler.entity';

export class UpdateUserDTO {
  username?: string;
  password?: string;
  roles?: string;
  advertiser?: Advertiser;
  traveler?: Traveler;
  resetPasswordToken: Object;
}

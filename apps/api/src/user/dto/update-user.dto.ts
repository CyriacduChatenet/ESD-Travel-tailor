import { IsObject, IsString } from 'class-validator';

import { Advertiser } from '../advertiser/entities/advertiser.entity';
import { Traveler } from '../traveler/entities/traveler.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ResetPasswordToken } from 'src/auth/reset-password-token/entities/reset-password-token.entity';

export class UpdateUserDTO {
  @IsString()
  @ApiProperty({
    description: 'The username of the user',
    type: String,
    example: 'John doe',
  })
  username?: string;

  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    type: String,
    example: '********',
  })
  password?: string;

  @IsString()
  @ApiProperty({
    description: 'The roles of the user',
    type: String,
    example: 'traveler',
  })
  roles?: string;

  @IsObject()
  @ApiProperty({
    description: 'The advertiser of the user',
    type: Advertiser,
    example: 'advertiser',
  })
  advertiser?: Advertiser;

  @IsObject()
  @ApiProperty({
    description: 'The traveler of the user',
    type: Object,
    example: Traveler,
  })
  traveler?: Traveler;

  @IsObject()
  @ApiProperty({
    description: 'The reset password token of the user',
    type: ResetPasswordToken,
    example: 'resetPasswordToken',
  })
  resetPasswordToken?: Object;
}

import { IsString, IsObject } from "class-validator";
import { Customer } from "../../payment/customer/entities/customer.entity";
import { ApiProperty } from "@nestjs/swagger";

export class SignupUserInputDTO {
  @IsString()
  @ApiProperty({
    description: 'The username of the user',
    type: String,
    example: 'username',
  })
  username: string;

  @IsString()
  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    type: String,
    example: 'password',
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
  customer?: Customer
}

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginUserInputDTO {
  @IsEmail()
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
  password: string;
}

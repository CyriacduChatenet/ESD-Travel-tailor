import { IsString } from "class-validator";

export class ValidateUserDto {
  @IsString()
  sub: string;

  @IsString()
  username: string;
}

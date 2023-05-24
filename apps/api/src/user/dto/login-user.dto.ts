import { IsEmail, IsString } from "class-validator";

export class LoginUserInputDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

import { IsString } from "class-validator";

export class SignupUserInputDTO {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password?: string;
}

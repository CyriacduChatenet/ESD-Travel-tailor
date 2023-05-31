import { IsString, IsObject } from "class-validator";
import { Customer } from "../../payment/customer/entities/customer.entity";

export class SignupUserInputDTO {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password?: string;

  @IsString()
  roles?: string;

  @IsObject()
  customer?: Customer
}

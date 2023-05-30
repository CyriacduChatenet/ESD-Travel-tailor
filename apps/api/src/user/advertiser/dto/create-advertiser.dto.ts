import { IsObject, IsString } from "class-validator";

import { User } from "src/user/entities/user.entity";


export class CreateAdvertiserDto {
  @IsString()
  name: string;

  @IsString()
  location: string;
}

import { IsString } from "class-validator";


export class CreateAdvertiserDto {
  @IsString()
  name: string;

  @IsString()
  location: string;
}

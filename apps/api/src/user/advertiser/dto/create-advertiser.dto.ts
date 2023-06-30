import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateAdvertiserDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the advertiser',
    type: String,
    example: 'John Doe',
  })
  name: string

  @IsString()
  @ApiProperty({
    description: 'The location of the advertiser',
    type: String,
    example: 'New York',
  })
  location: string
}

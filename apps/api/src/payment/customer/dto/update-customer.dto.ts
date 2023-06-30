import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateCustomerDto {
    @IsString()
    @ApiProperty({
        name: 'id',
        description: 'The id of the customer',
        type: String,
        default: "cus_123456789",
    })
    email: string;

    @IsString()
    @ApiProperty({
        description: 'The name of the customer',
        type: String,
        default: "John Doe",
    })
    name: string;

    @IsString()
    @ApiProperty({
        description: 'The address of the customer',
        type: String,
        default: "1234 Main St",
    })
    address: string;
}

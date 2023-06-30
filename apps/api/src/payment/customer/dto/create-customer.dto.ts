import { ApiProperty } from "@nestjs/swagger";
import { CreateCustomerDTO } from "@travel-tailor/types";
import { IsString } from "class-validator";

export class CreateCustomerDto implements CreateCustomerDTO {
    @IsString()
    @ApiProperty({
        description: 'The email of the customer',
        type: String,
        default: "user@example.com",
    })
    email?: string;

    @IsString()
    @ApiProperty({
        description: 'The name of the customer',
        type: String,
        default: "John Doe",
    })
    name?: string;

    @IsString()
    @ApiProperty({
        description: 'The stripe id of the customer',
        type: String,
        default: "cus_123456789",
    })
    stripeId?: string;

    @IsString()
    @ApiProperty({
        description: 'The address of the customer',
        type: String,
        default: "1234 Main St",
    })
    address?: string;
}

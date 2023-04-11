import { PartialType } from '@nestjs/mapped-types';
import { CreateStripeCustomerDto } from './create-stripe-customer.dto';

export class UpdateStripeCustomerDto extends PartialType(CreateStripeCustomerDto) {
    email: string;
}

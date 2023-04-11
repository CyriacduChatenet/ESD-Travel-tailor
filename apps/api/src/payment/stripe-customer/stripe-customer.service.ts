import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { InjectStripe } from 'nestjs-stripe';

import { CreateStripeCustomerDto } from './dto/create-stripe-customer.dto';
import { UpdateStripeCustomerDto } from './dto/update-stripe-customer.dto';

@Injectable()
export class StripeCustomerService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  async create(createStripeCustomerDto: CreateStripeCustomerDto) {
    return await this.stripeClient.customers.create({ email: createStripeCustomerDto.email });
  }

  async findAll() {
    return await this.stripeClient.customers.list();
  }

  async findOne(id: string) {
    return await this.stripeClient.customers.retrieve(id);
  }

  async update(id: string, updateStripeCustomerDto: UpdateStripeCustomerDto) {
    return await this.stripeClient.customers.update(id, { email: updateStripeCustomerDto.email });
  }

  async remove(id: string) {
    return await this.stripeClient.customers.del(id);
  }
}

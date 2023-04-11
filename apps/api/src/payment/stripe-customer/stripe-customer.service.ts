import { Injectable, UnauthorizedException } from '@nestjs/common';
import Stripe from 'stripe';
import { InjectStripe } from 'nestjs-stripe';

import { CreateStripeCustomerDto } from './dto/create-stripe-customer.dto';
import { UpdateStripeCustomerDto } from './dto/update-stripe-customer.dto';

@Injectable()
export class StripeCustomerService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  async create(createStripeCustomerDto: CreateStripeCustomerDto) {
    try {
      return await this.stripeClient.customers.create({ email: createStripeCustomerDto.email });
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll() {
    try {
      return await this.stripeClient.customers.list();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.stripeClient.customers.retrieve(id);
    } catch (error) {
        throw new UnauthorizedException(error);
    }
  }

  async update(id: string, updateStripeCustomerDto: UpdateStripeCustomerDto) {
    try {
      return await this.stripeClient.customers.update(id, { email: updateStripeCustomerDto.email });
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.stripeClient.customers.del(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}

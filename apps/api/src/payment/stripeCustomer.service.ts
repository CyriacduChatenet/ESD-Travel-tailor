import { Injectable } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe'
import Stripe from 'stripe'

@Injectable()
export class StripeCustomerService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  async createStripeCustomer() {
    const customer = await this.stripeClient.customers.create()
    return customer
  }

  async findAllStripeCustomers() {
    const customers = await this.stripeClient.customers.list()
    return customers
  }

  async findOneStripeCustomer(customerId: string) {
    const customer = await this.stripeClient.customers.retrieve(customerId)
    return customer
  }

  async updateStripeCustomer(customerId: string, data: any) {
    const customer = await this.stripeClient.customers.update(customerId, data)
    return customer
  }

  async deleteStripeCustomer(customerId: string) {
    const customer = await this.stripeClient.customers.del(customerId)
    return customer
  }
}

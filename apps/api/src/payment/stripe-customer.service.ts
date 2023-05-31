import { HttpException, Injectable } from "@nestjs/common";
import { InjectStripe } from "nestjs-stripe";
import Stripe from "stripe";

@Injectable()
export class StripeCustomerService {
    constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

    async createStripeCustomer(stripeCredentials: { email: string, name: string }) {
        return await this.stripeClient.customers.create({ email: stripeCredentials.email, name: stripeCredentials.name });
    };

    async findAll() {
        return await this.stripeClient.customers.list();
    }

    async findOne(customerId: string) {
        return await this.stripeClient.customers.retrieve(customerId);
    }

    async update(customerId: string, email: string) {
        return await this.stripeClient.customers.update(customerId, { email });
    }

    async delete(customerId: string) {
        return await this.stripeClient.customers.del(customerId);
    }

    async addPaymentMethod(customerId: string, card): Promise<any> {
        try {
          const paymentMethod = await this.stripeClient.paymentMethods.create({
            type: 'card',
            card,
          });
    
          await this.stripeClient.paymentMethods.attach(paymentMethod.id, {
            customer: customerId,
          });
    
          const customer = await this.stripeClient.customers.update(customerId, {
            invoice_settings: {
              default_payment_method: paymentMethod.id,
            },
          });
    
          return customer;
        } catch (err) {
          throw new HttpException(err.message, 402);
        }
      }
}
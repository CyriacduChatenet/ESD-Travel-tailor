import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe'
import Stripe from 'stripe'

import { CreatePaymentDto } from './dto/create-payment.dto'
import { OrderService } from './order/order.service'
import { CustomerService } from './customer/customer.service'

@Injectable()
export class PaymentService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private orderService: OrderService,
    @Inject(forwardRef(() => CustomerService))
    private customerService: CustomerService
  ) {}

  async createPaymentIntent(createPaymentDto: CreatePaymentDto) {
    const paymentMethod = await this.stripeClient.paymentMethods.create({
      type: 'card',
      card: createPaymentDto.card,
    })

    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount: createPaymentDto.amount,
      currency: 'eur',
      payment_method: paymentMethod.id,
    })

    return paymentIntent
  }

  async confirmPaymentIntent(paymentIntentId: string, customerId: string) {
      const paymentIntent = await this.stripeClient.paymentIntents.confirm(paymentIntentId);
  
        const custom = await this.customerService.findOne(customerId);

        if (custom && custom.orders) {
        const order = await this.orderService.create({
            amount: paymentIntent.amount,
            payment_id: paymentIntent.id,
            capture_method: paymentIntent.capture_method,
            client_secret: paymentIntent.client_secret,
            confirmation_method: paymentIntent.confirmation_method,
            payment_created_at: paymentIntent.created,
            currency: paymentIntent.currency,
            paymentMethodTypes: paymentIntent.payment_method_types[0],
            status: paymentIntent.status,
            customer: {
              id: custom.id,
              email: custom.email,
              orders: [...custom.orders],
            },
          });
        
          const customer = await this.customerService.findOne(customerId);
        
          if (customer && customer.orders) {
            await this.customerService.update(customerId, {
              ...customer,
              orders: [...customer.orders, order.id],
            });
          }
        }
  
      return paymentIntent;
  }
}

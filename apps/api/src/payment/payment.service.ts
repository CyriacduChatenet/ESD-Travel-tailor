import { HttpException, Injectable } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe'
import Stripe from 'stripe'
import { ConfigService } from '@nestjs/config'

import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { InvoiceService } from './invoice.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private configService: ConfigService,
    private invoiceService: InvoiceService,
  ) {}

  async createCheckoutSession(createCheckoutDto: CreateCheckoutDto): Promise<string> {
    try {
      const session = await this.stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: createCheckoutDto.currency ? createCheckoutDto.currency : 'eur',
              product_data: {
                name: 'Product Name',
                description: 'Product Description',
              },
              unit_amount: createCheckoutDto.amount * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${this.configService.get('CLIENT_APP_URL')}/payment/success`,
        cancel_url: `${this.configService.get('CLIENT_APP_URL')}/payment/cancel`,
      });

      return session.id;
    } catch (err) {
      throw new HttpException(err.message, 402);
    }
  }
}

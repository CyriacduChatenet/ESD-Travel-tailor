import { HttpException, Injectable } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe'
import Stripe from 'stripe'
import { ConfigService } from '@nestjs/config'

import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { MailService } from '../mail/mail.service';
import { InvoiceService } from './invoice.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private configService: ConfigService,
    private mailService: MailService,
    private invoiceService: InvoiceService,
  ) { }

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

  async successPayment(body: any) {
    try {
      const event = body.data.object;

      if (event.object === 'checkout.session' && event.payment_status === 'paid') {
        const session = event.id;
  
        const checkoutSession = await this.stripeClient.checkout.sessions.retrieve(session);
  
        const invoice = await this.invoiceService.create({
          amount: checkoutSession.amount_total,
          payment_id: checkoutSession.payment_intent,
          customer: checkoutSession.customer,
        })
  
        const invoiceUrl = invoice.hosted_invoice_url;
        await fetch(`${invoiceUrl}.pdf`, {
          headers: {
            Authorization: `Bearer ${this.configService.get('STRIPE_API_KEY')}`,
          },
        }).then((response) => console.log(response));
    
        const filename = `invoice_${invoice.id}.pdf`;
    
  
        // const invoicePdf = await this.stripeClient.invoices.retrievePdf(invoice.id);
        // await this.mailService.sendInvoiceMail(checkoutSession.customer_email, invoicePdf);
      }
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }
}

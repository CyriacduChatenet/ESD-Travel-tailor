import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { Response } from 'express';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import { PaymentService } from './payment.service'
import { OpencageService } from '../opencage/opencage.service';
import { Roles } from '../config/decorators/roles.decorator';
import { Role } from '../config/enum/role.enum';
import { StripeInvoiceService } from './stripe-invoice.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payment')
@UseGuards(ThrottlerGuard)
export class PaymentController {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly paymentService: PaymentService,
    private readonly stripeInvoiceService: StripeInvoiceService,
    private opencageService: OpencageService,
  ) { }


  @Post('checkout/:customerId')
  @Throttle(100, 60)
  @Roles(Role.Advertiser, Role.Admin)
  async createCheckoutSession(@Param('customerId') customerId: string ,@Body() { amount }: { amount: number }): Promise<{ sessionId: string }> {
    // const currency = await this.opencageService.getCurrency({ location });
    const createCheckoutDto: { currency: string, amount: number, customer: string } = {
      currency: 'eur',
      amount,
      customer: customerId,
    };
    const sessionId = await this.paymentService.createCheckoutSession(createCheckoutDto);
    return { sessionId };
  }

  @Get('invoices/customer/:customerId')
  @Throttle(100, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  async findAllInvoices(@Param() { customerId }: { customerId: string }): Promise<Stripe.Invoice[]> {
    return await this.stripeInvoiceService.findAllInvoices(customerId);
  }

  @Get('invoices/:invoiceId')
  @Throttle(100, 60)
  @Roles(Role.Advertiser, Role.Admin)
  async findOneInvoice(@Param() { invoiceId }: { invoiceId: string }): Promise<Stripe.Invoice> {
    return await this.stripeInvoiceService.findOneInvoice(invoiceId);
  }

  @Get('invoices/pdf/:invoiceId')
  @Throttle(100, 60)
  @Roles(Role.Advertiser, Role.Admin)
  async findOneInvoicePdf(@Param() { invoiceId }: { invoiceId: string }, @Res() res: Response) {
    const invoicePDF = await this.stripeInvoiceService.findOneInvoicePdf(invoiceId);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${invoiceId}.pdf"`,
    });
    res.send(invoicePDF);
  }
}

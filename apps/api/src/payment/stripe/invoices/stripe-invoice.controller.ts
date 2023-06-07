import { Controller, Get, Param, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { Throttle } from "@nestjs/throttler";
import Stripe from "stripe";

import { Roles } from "../../../config/decorators/roles.decorator";
import { Role } from "../../../config/enum/role.enum";
import { StripeInvoiceService } from "./stripe-invoice.service";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";

@Controller("payment/invoice")
export class StripeInvoiceController {
    constructor(private readonly stripeInvoiceService: StripeInvoiceService) { }

    @Get('customer/:customerId')
    @Throttle(500, 60)
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Advertiser, Role.Admin)
    async findAllInvoices(@Param() { customerId }: { customerId: string }): Promise<Stripe.Invoice[]> {
      return await this.stripeInvoiceService.findAllInvoices(customerId);
    }
  
    @Get(':invoiceId')
    @Throttle(500, 60)
    @Roles(Role.Advertiser, Role.Admin)
    async findOneInvoice(@Param() { invoiceId }: { invoiceId: string }): Promise<Stripe.Invoice> {
      return await this.stripeInvoiceService.findOneInvoice(invoiceId);
    }
  
    @Get('pdf/:invoiceId')
    @Throttle(500, 60)
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
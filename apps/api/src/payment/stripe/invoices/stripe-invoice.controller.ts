import { Controller, Get, Param, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";
import Stripe from "stripe";
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from "@nestjs/swagger";

import { Roles } from "../../../config/decorators/roles.decorator";
import { Role } from "../../../config/enum/role.enum";
import { StripeInvoiceService } from "./stripe-invoice.service";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";

@Controller("payment/invoice")
@UseGuards(ThrottlerGuard)
@ApiTags('Stripe Invoices')
export class StripeInvoiceController {
  constructor(private readonly stripeInvoiceService: StripeInvoiceService) { }

  @Get('customer/:customerId')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Retrieved invoices successfully', type: [Stripe.InvoicesResource] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findAllInvoices(@Param() { customerId }: { customerId: string }): Promise<Stripe.Invoice[]> {
    return await this.stripeInvoiceService.findAllInvoices(customerId);
  }

  @Get(':invoiceId')
  @Throttle(1000, 60)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiOkResponse({ description: 'Retrieved invoice successfully', type: Stripe.InvoicesResource })
  @ApiNotFoundResponse({ description: 'Invoice not found' })
  async findOneInvoice(@Param() { invoiceId }: { invoiceId: string }): Promise<Stripe.Invoice> {
    return await this.stripeInvoiceService.findOneInvoice(invoiceId);
  }

  @Get('pdf/:invoiceId')
  @Throttle(1000, 60)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiOkResponse({ description: 'Retrieved invoice PDF successfully', type: 'application/pdf' })
  @ApiNotFoundResponse({ description: 'Invoice not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findOneInvoicePdf(@Param() { invoiceId }: { invoiceId: string }, @Res() res: Response) {
    const invoicePDF = await this.stripeInvoiceService.findOneInvoicePdf(invoiceId);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${invoiceId}.pdf"`,
    });
    res.send(invoicePDF);
  }
}

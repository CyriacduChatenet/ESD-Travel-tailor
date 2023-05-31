import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectStripe } from "nestjs-stripe";
import Stripe from "stripe";

@Injectable()
export class StripeInvoiceService {
    constructor(@InjectStripe() private readonly stripeClient: Stripe) { }

    async createInvoice(customerId: string, amount: number): Promise<Stripe.Invoice> {
        try {
            return await this.stripeClient.invoices.create({
                customer: customerId,
                currency: 'eur',
                auto_advance: true,
                collection_method: 'send_invoice',
                description: 'Invoice Description',
                metadata: {
                    orderId: '123',
                },
            });
        } catch (err) {
            throw new UnauthorizedException(err);
        }
    }

    async findAllInvoices(customerId: string): Promise<Stripe.Invoice[]> {
        try {
            const invoices = await this.stripeClient.invoices.list({
                customer: customerId,
            });
            return invoices.data;
        } catch (err) {
            throw new NotFoundException(err);
        }
    }

    async findOneInvoice(invoiceId: string): Promise<Stripe.Invoice> {
        try {
            return await this.stripeClient.invoices.retrieve(invoiceId);
        } catch (err) {
            throw new NotFoundException(err);
        }
    }

    async findOneInvoicePdf(invoiceId: string): Promise<Buffer> {
        const invoice = await this.stripeClient.invoices.retrieve(invoiceId);
        const invoicePDFUrl = invoice.invoice_pdf as string;
    
        const response = await fetch(invoicePDFUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/pdf',
          },
        });
    
        const data = await response.arrayBuffer();
        return Buffer.from(data);
      }

    async updateInvoice(invoiceId: string): Promise<Stripe.Invoice> {
        try {
            return await this.stripeClient.invoices.update(invoiceId, {
                auto_advance: true,
                collection_method: 'send_invoice',
                description: 'Invoice Description',
                metadata: {
                    orderId: '123',
                },
            });
        } catch (err) {
            throw new NotFoundException(err);
        }
    }
};
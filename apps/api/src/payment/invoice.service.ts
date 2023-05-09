import { Injectable } from "@nestjs/common";
import { InjectStripe } from "nestjs-stripe";
import Stripe from "stripe";

@Injectable()

export class InvoiceService {
    constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

    async create(invoiceDTO) {
        const invoice = await this.stripeClient.invoices.create({
            customer: invoiceDTO.customer,
            collection_method: 'send_invoice',
            days_until_due: 30,
            default_payment_method: invoiceDTO.paymentId,
            auto_advance: true,
            description: 'Invoice for product X',
            currency: invoiceDTO.currency,
            payment_settings: {
                payment_method_types: ['card'],
            },
        });

        return invoice;
    }
    
    async findAll() {}

    async findOne() {}

    async update() {}

    async delete() {}
}
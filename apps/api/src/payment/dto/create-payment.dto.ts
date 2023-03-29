import { CreatePaymentDTO } from "@travel-tailor/types";

export class CreatePaymentDto implements CreatePaymentDTO {
    amount: number;
    card: {
        number: string;
        exp_month: number;
        exp_year: number;
        cvc: string;
    }
}

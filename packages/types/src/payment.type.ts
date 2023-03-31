export type CreatePaymentDTO = {
    amount: number, 
    card: {
        number: string,
        exp_month: number,
        exp_year: number,
        cvc: string
    }
};

export type PaymentCredentials = {
    number: string, 
    exp_month: number, 
    exp_year: number, 
    cvc: string
};
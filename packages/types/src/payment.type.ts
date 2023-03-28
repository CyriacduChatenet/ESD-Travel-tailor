export type CreatePaymentDTO = {
    amount: number, 
    card: Object
};

export type PaymentCredentials = {
    number: string, 
    exp_month: number, 
    exp_year: number, 
    cvc: number
};
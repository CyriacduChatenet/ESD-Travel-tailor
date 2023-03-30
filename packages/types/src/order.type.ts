import { Customer } from './customer.type'

export type Order = {
  id: string
  customer: Customer | string
  amount: number
  payment_id: string
  capture_method: string
  client_secret: string
  confirmation_method: string
  payment_created_at: number
  currency: string
  paymentMethodTypes: string
  status: string
}

export type CreateOrderDTO = {
  amount: number
  payment_id: string
  capture_method: string
  client_secret: string
  confirmation_method: string
  payment_created_at: number
  currency: string
  paymentMethodTypes: string
  status: string
}

export type UpdateOrderDTO = {
  amount: number
  payment_id: string
  capture_method: string
  client_secret: string
  confirmation_method: string
  payment_created_at: number
  currency: string
  paymentMethodTypes: string
  status: string
}

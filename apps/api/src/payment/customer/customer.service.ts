import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { StripeCustomerService } from '../stripe/customer/stripe-customer.service'
import { CustomerRepository } from './customer.repository'

@Injectable()
export class CustomerService {
  constructor(
    private customerRepository: CustomerRepository,
    private stripeCustomerService: StripeCustomerService
  ) {}

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    try {
      const stripeCustomer = await this.stripeCustomerService.createStripeCustomer({ email: createCustomerDto.email, name: createCustomerDto.name })
      return await this.customerRepository.createCustomer(createCustomerDto, stripeCustomer)
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Unauthorized to create customer',
        error,
      })
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      return await this.customerRepository.findAllCustomer(queries)
    } catch (error) {
      throw new NotFoundException({
        message: 'List of customers not found',
        error,
      })
    }
  }

  async findOne(id: string) {
    try {
      return await this.customerRepository.findOneCustomer(id)
    } catch (error) {
      throw new NotFoundException({
        message: `Customer with id ${id} not found`,
        error,
      })
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      return await this.customerRepository.updateCustomer(id, updateCustomerDto)
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to update customer with id ${id}`,
        error
      })
    }
  }

  async remove(id: string) {
    try {
      return await this.customerRepository.removeCustomer(id)
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to remove customer with id ${id}`,
        error
      })
    }
  }
}

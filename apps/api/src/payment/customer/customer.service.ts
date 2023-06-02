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
import { StripeCustomerService } from '../stripe-customer.service'
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
      throw new UnauthorizedException(error)
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      return await this.customerRepository.findAllCustomer(queries)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: string) {
    try {
      return await this.customerRepository.findOneCustomer(id)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      return await this.customerRepository.updateCustomer(id, updateCustomerDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.customerRepository.removeCustomer(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}

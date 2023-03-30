import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiLimitResourceQuery } from '@travel-tailor/types';
import { Repository } from 'typeorm';
import { StripeCustomerService } from '../stripeCustomer.service';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(Customer) private customerRepository: Repository<Customer>, @Inject(forwardRef(() => StripeCustomerService))
  private stripeCustomerService: StripeCustomerService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const stripeCustomer = await this.stripeCustomerService.createStripeCustomer();
      return await this.customerRepository.save({...createCustomerDto, stripeId:stripeCustomer.id});
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      let { page, limit } = queries;
      page = page ? +page : 1;
      limit = limit ? +limit : 10;
      
      return await this.customerRepository.createQueryBuilder('customer')
      .leftJoinAndSelect('customer.orders', 'orders')
      .leftJoinAndSelect('customer.advertiser', 'advertiser')
      .leftJoinAndSelect('customer.traveler', 'traveler')
      .orderBy('customer.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany()
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string) {
    try {
    return await this.customerRepository.createQueryBuilder('customer')
      .where('customer.id = :id', { id })
      .getOne();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  // async update(id: string, updateCustomerDto: UpdateCustomerDto) {
  //   try {
  //   return await this.customerRepository.update(id, updateCustomerDto);
  //   } catch (error) {
  //     throw new UnauthorizedException(error);
  //   }
  // }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const mapper = (dto: UpdateCustomerDto) => {
        const { orders, ...rest } = dto;
        return {
          ...rest,
          orders: orders ? orders.map(order => typeof order === 'string' ? { id: order } : order) : []
        };
      };
      
      const partialEntity = mapper(updateCustomerDto);
  
      return await this.customerRepository.update(id, partialEntity);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
  

  async remove(id: string) {
    try {
    return await this.customerRepository.softDelete(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}

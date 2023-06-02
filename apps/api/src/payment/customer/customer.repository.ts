import { DataSource, Repository } from "typeorm";

import { Customer } from "./entities/customer.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import Stripe from "stripe";
import { ApiLimitResourceQuery } from "@travel-tailor/types";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

export class CustomerRepository extends Repository<Customer> {
    constructor(@InjectDataSource() datasource: DataSource) {
        super(Customer, datasource.createEntityManager());
    }

    async createCustomer(createCustomerDto: CreateCustomerDto, stripeCustomer: Stripe.Response<Stripe.Customer>) {
          return await this.save({ ...createCustomerDto, stripeId: stripeCustomer.id })
      }
    
      async findAllCustomer(queries: ApiLimitResourceQuery) {
          let { page, limit } = queries
          page = page ? +page : 1
          limit = limit ? +limit : 10
    
          return await this.createQueryBuilder('customer')
            .leftJoinAndSelect('customer.advertiser', 'advertiser')
            .leftJoinAndSelect('customer.traveler', 'traveler')
            .orderBy('customer.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit)
            .getMany()
      }
    
      async findOneCustomer(id: string) {
          return await this.createQueryBuilder('customer')
            .where('customer.id = :id', { id })
            .getOne()
      }
    
      async updateCustomer(id: string, partialEntity) {
          return await this.update(id, partialEntity)
      }
    
      async removeCustomer(id: string) {
          return await this.softDelete(id)
      }
}
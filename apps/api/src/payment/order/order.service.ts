import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { OrderRepository } from './order.repository'

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = this.orderRepository.create(
        Object.assign({}, createOrderDto)
      );

      return await this.orderRepository.createOrder(order);
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      return this.orderRepository.findAllOrder(queries)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: string) {
    try {
      return await this.orderRepository.findOneOrder(id)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      return await this.orderRepository.updateOrder(id, updateOrderDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.orderRepository.removeOrder(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}

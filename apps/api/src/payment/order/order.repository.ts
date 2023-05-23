import { DataSource, Repository } from "typeorm";

import { Order } from "./entities/order.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { ApiLimitResourceQuery } from "@travel-tailor/types";
import { UpdateOrderDto } from "./dto/update-order.dto";

export class OrderRepository extends Repository<Order> {
    constructor(@InjectDataSource() private readonly datasource: DataSource) {
        super(Order, datasource.createEntityManager());
    }

    async createOrder(order: Order) {
        return await this.save(order);
    }

    async findAllOrder(queries: ApiLimitResourceQuery) {
        let { page, limit } = queries;
        page = page ? +page : 1;
        limit = limit ? +limit : 10;

        return await this.createQueryBuilder('order')
            .leftJoinAndSelect('order.customer', 'customer')
            .orderBy('order.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit)
            .getMany()
    }

    async findOneOrder(id: string) {
        return await this.createQueryBuilder('order')
            .leftJoinAndSelect('order.customer', 'customer')
            .where('order.id = :id', { id })
            .getOne();
    }

    async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
        return await this.update(id, updateOrderDto)
    }

    async removeOrder(id: string) {
        return await this.softDelete(id)
    }
}
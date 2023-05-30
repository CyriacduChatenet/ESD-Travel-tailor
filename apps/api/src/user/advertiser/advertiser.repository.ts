import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

import { Advertiser } from "./entities/advertiser.entity";
import { CreateAdvertiserDto } from "./dto/create-advertiser.dto";
import { Customer } from "../../payment/customer/entities/customer.entity";
import { ApiLimitResourceQuery } from "@travel-tailor/types";
import { UpdateAdvertiserDto } from "./dto/update-advertiser.dto";

export class AdvertiserRepository extends Repository<Advertiser> {
    constructor(@InjectDataSource() datasource: DataSource) {
        super(Advertiser, datasource.createEntityManager());
    }

    async createAdvertiser(createAdvertiserDto: CreateAdvertiserDto, customer: Customer) {
            const advertiser = this.create({...createAdvertiserDto, customer})
            return await this.save(advertiser)
    }

    async saveAdvertiser(advertiser: CreateAdvertiserDto) {
            return await this.save(advertiser)
    }

    async findAllAdvertiser(queries: ApiLimitResourceQuery) {
            let { page, limit, sortedBy, name, location } = queries
            page = page ? +page : 1
            limit = limit ? +limit : 10

            const query = this.createQueryBuilder('advertiser')
                .leftJoinAndSelect('advertiser.activities', 'activities')
                .leftJoinAndSelect('advertiser.user', 'user')
                .leftJoinAndSelect('advertiser.customer', 'customer')

            if (sortedBy) {
                query.orderBy('advertiser.createdAt', sortedBy)
            } else {
                query.orderBy('advertiser.createdAt', 'DESC')
            }

            if (name) {
                query.where('advertiser.name = :name', { name })
            }

            if (location) {
                query.where('advertiser.location = :location', { location })
            }

            return {
                page: page,
                limit: limit,
                total: await query.getCount(),
                data: await query.skip((page - 1) * limit).take(limit).getMany(),
            }
    }

    async findOneAdvertiser(id: string) {
            return await this.createQueryBuilder('advertiser')
                .where('advertiser.id = :id', { id })
                .leftJoinAndSelect('advertiser.activities', 'activities')
                .leftJoinAndSelect('advertiser.user', 'user')
                .leftJoinAndSelect('advertiser.customer', 'customer')
                .getOne()
    }

    async updateAdvertiser(id: string, updateAdvertiserDto: UpdateAdvertiserDto) {
            return await this.update(id, updateAdvertiserDto)
    }

    async removeAdvertiser(id: string) {
            return await this.softDelete(id)
    }
}
import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

import { Advertiser } from "./entities/advertiser.entity";
import { CreateAdvertiserDto } from "./dto/create-advertiser.dto";
import { ApiLimitResourceQuery } from "@travel-tailor/types";
import { UpdateAdvertiserDto } from "./dto/update-advertiser.dto";

export class AdvertiserRepository extends Repository<Advertiser> {
    constructor(@InjectDataSource() datasource: DataSource) {
        super(Advertiser, datasource.createEntityManager());
    }

    async createAdvertiser(createAdvertiserDto: CreateAdvertiserDto) {
            const advertiser = this.create(createAdvertiserDto)
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
                .getOne()
    }

    async updateAdvertiser(id: string, updateAdvertiserDto: UpdateAdvertiserDto) {
            await this.update(id, updateAdvertiserDto)
            return await this.findOneAdvertiser(id)
    }

    async removeAdvertiser(id: string) {
            return await this.softDelete(id)
    }
}
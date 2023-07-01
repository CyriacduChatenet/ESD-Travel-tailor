import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { ApiLimitResourceQuery } from "@travel-tailor/types";

import { Traveler } from "./entities/traveler.entity";
import { CreateTravelerDto } from "./dto/create-traveler.dto";
import { UpdateTravelerDTO } from "./dto/update-traveler.dto";

export class TravelerRepository extends Repository<Traveler> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(Traveler, dataSource.createEntityManager());
    }

    async createTraveler(createTravelerDto: CreateTravelerDto) {
        const traveler = this.create(createTravelerDto)
        return await this.save(traveler)
    }

    async saveTraveler(traveler: Traveler) {
        return await this.save(traveler)
    }

    async findAllTraveler(queries: ApiLimitResourceQuery) {
        let { page, limit, sortedBy } = queries
        page = page ? +page : 1
        limit = limit ? +limit : 10

        const query = this.createQueryBuilder('traveler')
            .leftJoinAndSelect('traveler.user', 'user')
            .leftJoinAndSelect('user.customer', 'customer')
            .leftJoinAndSelect('traveler.tastes', 'tastes')
            .leftJoinAndSelect('traveler.travels', 'travel')
            .leftJoinAndSelect('traveler.comments', 'comment')
            .leftJoinAndSelect('travel.days', 'day')
            .leftJoinAndSelect('traveler.comments', 'comments')

        if (sortedBy) {
            query.orderBy('traveler.createdAt', sortedBy)
        } else {
            query.orderBy('traveler.createdAt', 'DESC')
        }

        return {
            page: page,
            limit: limit,
            total: await query.getCount(),
            data: await query.skip((page - 1) * limit).take(limit).getMany(),
        }
    }

    async findOneTraveler(id: string) {
        return await this.createQueryBuilder('traveler')
            .where('traveler.id = :id', { id })
            .leftJoinAndSelect('traveler.user', 'user')
            .leftJoinAndSelect('user.customer', 'customer')
            .leftJoinAndSelect('traveler.tastes', 'tastes')
            .leftJoinAndSelect('traveler.travels', 'travel')
            .leftJoinAndSelect('traveler.comments', 'comment')
            .leftJoinAndSelect('travel.days', 'day')
            .leftJoinAndSelect('traveler.comments', 'comments')
            .getOne()
    }

    async updateTraveler(id: string, updateTravelerDto: UpdateTravelerDTO) {
        return await this.update(id, updateTravelerDto)
    }

    async removeTraveler(id: string) {
        return await this.softDelete(id)
    }
}
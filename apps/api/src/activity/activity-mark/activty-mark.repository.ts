import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

import { ActivityMark } from "./entities/activity-mark.entity";
import { CreateActivityMarkDto } from "./dto/create-activity-mark.dto";
import { UpdateActivityMarkDto } from "./dto/update-activity-mark.dto";
import { ApiLimitResourceQuery } from "@travel-tailor/types";

export class ActivityMarkRepository extends Repository<ActivityMark> {
    constructor(@InjectDataSource() datasource: DataSource) {
        super(ActivityMark, datasource.createEntityManager())
    }

    async createActivityMark(createActivityMarkDto: CreateActivityMarkDto) {
        const activityMark = this.create(createActivityMarkDto);
        return await this.save(activityMark);
    }

    async findAllActivityMark(queries: ApiLimitResourceQuery) {
        let { limit, page, sortedBy } = queries;
        page = page ? +page : 1;
        limit = limit ? +limit : 10;

        let query = this.createQueryBuilder('activityMark')
            .leftJoinAndSelect('activityMark.activity', 'activity')

        if (sortedBy) {
            query.orderBy('activity.createdAt', sortedBy)
        }

        return {
            page: page,
            limit: limit,
            total: await query.getCount(),
            data: await query.skip((page - 1) * limit).take(limit).getMany()
        }

    }

    async findOneActivityMark(id: string) {
        return await this.createQueryBuilder('activityMark')
        .leftJoinAndSelect('activityMark.activity', 'activity')
        .where('activityMark.id = :id', { id })
        .getOne();
    }

    async updateActivityMark(id: string, updateActivityMarkDto: UpdateActivityMarkDto) {
        await this.update(id, updateActivityMarkDto);
        return await this.findOneActivityMark(id);
    }

    async removeActivityMark(id: string) {
        return await this.softDelete(id);
    }
}
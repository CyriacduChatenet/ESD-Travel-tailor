import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { ApiLimitResourceQuery } from "@travel-tailor/types";

import { ActivityClosingDay } from "./entities/activity-closing-day.entity";
import { UpdateActivityClosingDayDto } from "./dto/update-activity-closing-day.dto";
import { CreateActivityClosingDayDto } from "./dto/create-activity-closing-day.dto";

export class ActivityClosingDayRepository extends Repository<ActivityClosingDay> {
    constructor(@InjectDataSource() private readonly datasource: DataSource) {
        super(ActivityClosingDay, datasource.createEntityManager());
    }

    async createActivityClosingDay(createActivityClosingDayDto: CreateActivityClosingDayDto) {
        const activityClosingDay = this.create(
            createActivityClosingDayDto,
        );
        return await this.save(activityClosingDay);
    }

    async findAllActivityClosingDay(queries: ApiLimitResourceQuery) {
        let { page, limit, sortedBy, activityDetail } = queries;
        page = page ? +page : 1;
        limit = limit ? +limit : 10;

        const query = this.createQueryBuilder('activityClosingDay')
            .leftJoinAndSelect('activityClosingDay.activityDetail', 'activityDetail')

        if (sortedBy) {
            query.orderBy('activityClosingDay.createdAt', sortedBy);
        } else {
            query.orderBy('activityClosingDay.createdAt', 'DESC');
        }

        if (activityDetail) {
            query.where('activityClosingDay.activityDetail = :activityDetail', { activityDetail });
        }

        return {
            page: page,
            limit: limit,
            total: await query.getCount(),
            data: await query.skip((page - 1) * limit).take(limit).getMany()
        };
    }

    async findOneActivityClosingDay(id: string) {
        return await this.createQueryBuilder('activityClosingDay')
            .leftJoinAndSelect('activityClosingDay.activity', 'activity')
            .where('activityClosingDay.id = :id', { id })
            .getOne();
    }

    async updateActivityClosingDay(id: string, updateActivityClosingDayDto: UpdateActivityClosingDayDto) {
        await this.update(id, updateActivityClosingDayDto)
        return await this.findOneActivityClosingDay(id);
    }

    async removeActivityClosingDay(id: string) {
        return await this.softDelete(id);
    }
}
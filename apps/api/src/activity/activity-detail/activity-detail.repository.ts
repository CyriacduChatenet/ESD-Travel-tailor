import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Injectable } from '@nestjs/common';
import { ApiLimitResourceQuery } from "@travel-tailor/types";

import { ActivityDetail } from "./entities/activity-detail.entity";
import { CreateActivityDetailDto } from "./dto/create-activity-detail.dto";
import { UpdateActivityDetailDto } from "./dto/update-activity-detail.dto";

@Injectable()
export class ActivityDetailRepository extends Repository<ActivityDetail> {
    constructor(@InjectDataSource() private readonly datasource: DataSource) {
        super(ActivityDetail, datasource.createEntityManager());
    }

    async createActivityDetail(createActivityDetailDto: CreateActivityDetailDto) {
        return await this.create(createActivityDetailDto);
    }

    async findAllActivityDetail(queries: ApiLimitResourceQuery) {
        let { page, limit, sortedBy, duration, location } = queries;
        page = page ? +page : 1;
        limit = limit ? +limit : 10;

        const query = this.createQueryBuilder('activityDetail')
            .leftJoinAndSelect('activityDetail.activity', 'activity')
            .leftJoinAndSelect('activityDetail.schedules', 'activitySchedule')
            .leftJoinAndSelect('activityDetail.closingDays', 'activityClosingDay')

        if (sortedBy) {
            query.orderBy('activityDetail.createdAt', sortedBy);
        } else {
            query.orderBy('activityDetail.createdAt', 'DESC');
        }

        if (duration) {
            query.andWhere('activityDetail.duration = :duration', { duration });
        }

        if (location) {
            query.andWhere('activityDetail.location = :location', { location });
        }

        return {
            page: page,
            limit: limit,
            total: await query.getCount(),
            data: await query.skip((page - 1) * limit).take(limit).getMany(),
        };
    }

    async findOneActivityDetail(id: string) {
        return await this.createQueryBuilder('activityDetail')
            .leftJoinAndSelect('activityDetail.activity', 'activity')
            .leftJoinAndSelect('activityDetail.schedules', 'activitySchedule')
            .leftJoinAndSelect('activityDetail.closingDays', 'activityClosingDay')
            .where('activityDetail.id = :id', { id })
            .getOne();
    }

    async updateActivityDetail(id: string, updateActivityDetailDto: UpdateActivityDetailDto) {
            await this.update(id, updateActivityDetailDto);
            return await this.findOneActivityDetail(id);
    }

    async removeActivityDetail(id: string) {
            return await this.softDelete(id);
    }
}
import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ApiLimitResourceQuery } from "@travel-tailor/types";

import { ActivitySchedule } from "./entities/activity-schedule.entity";
import { CreateActivityScheduleDto } from "./dto/create-activity-schedule.dto"
import { UpdateActivityScheduleDto } from "./dto/update-activity-schedule.dto";

export class ActivityScheduleRepository extends Repository<ActivitySchedule> {
    constructor(@InjectDataSource() private readonly datasource: DataSource) {
        super(ActivitySchedule, datasource.createEntityManager());
    }

    async createActivitySchedule(createActivityScheduleDto: CreateActivityScheduleDto) {
        try {
          const activitySchedule = this.create(
            createActivityScheduleDto,
          );
          return await this.save(activitySchedule);
        } catch (error) {
          throw new UnauthorizedException(error);
        }
      }
    
      async findAllActivitySchedule(queries: ApiLimitResourceQuery) {
        try {
          let { page, limit, sortedBy, opening_at, closing_at } = queries;
          page = page ? +page : 1;
          limit = limit ? +limit : 10;
    
          const query = this.createQueryBuilder('activitySchedule')
            .leftJoinAndSelect('activitySchedule.activityDetail', 'activityDetail')
    
            if(sortedBy) {
              query.orderBy('activitySchedule.createdAt', sortedBy);
            } else {
              query.orderBy('activitySchedule.createdAt', 'DESC');
            }
    
            if(opening_at) {
              query.where('activitySchedule.opening_at = :opening_at', { opening_at });
            }
    
            if(closing_at) {
              query.where('activitySchedule.closing_at = :closing_at', { closing_at });
            }
    
            return {
              page: page,
              limit: limit,
              total: await query.getCount(),
              data: await query.skip((page - 1) * limit).take(limit).getMany()
            };
        } catch (error) {
          throw new NotFoundException(error);
        }
      }
    
      async findOneActivitySchedule(id: string) {
        try {
          return await this.createQueryBuilder('activitySchedule')
            .leftJoinAndSelect('activitySchedule.activityDetail', 'activityDetail')
            .where('activitySchedule.id = :id', { id })
            .getOne();
        } catch (error) {
          throw new NotFoundException(error);
        }
      }
    
      async updateActivitySchedule(id: string, updateActivityScheduleDto: UpdateActivityScheduleDto) {
        try {
          return await this.update(
            id,
            updateActivityScheduleDto,
          );
        } catch (error) {
          throw new UnauthorizedException(error);
        }
      }
    
      async removeActivitySchedule(id: string) {
        try {
          return await this.softDelete(id);
        } catch (error) {
          throw new UnauthorizedException(error);
        }
      }
}
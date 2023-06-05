import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

import { Day } from "./entities/day.entity";
import { CreateDayDto } from "./dto/create-day.dto";
import { ApiLimitResourceQuery } from "@travel-tailor/types";
import { UpdateDayDto } from "./dto/update-day.dto";

export class DayRepository extends Repository<Day> {
    constructor (@InjectDataSource() datasource: DataSource) {
        super(Day, datasource.createEntityManager());
    }

    async createDay(createDayDto: CreateDayDto) {
          const day = this.create(createDayDto)
          return await this.save(day)
      }
    
      async findAllDay(queries: ApiLimitResourceQuery) {
          let { page, limit, sortedBy, startTime, endTime, date } = queries;
          page = page ? +page : 1;
          limit = limit ? +limit : 10;
    
          const query = this.createQueryBuilder('day')
          .leftJoinAndSelect('day.travel', 'travel')
          .leftJoinAndSelect('day.timeSlots', 'timeSlots')
    
          if(sortedBy) {
            query.orderBy('day.createdAt', sortedBy)
          } else {
            query.orderBy('day.createdAt', 'DESC')
          }
    
          if(startTime) {
            query.andWhere('day.startTime = :startTime', { startTime })
          }
    
          if(endTime) {
            query.andWhere('day.endTime = :endTime', { endTime })
          }
    
          if(date) {
            query.andWhere('day.date = :date', { date })
          }
    
          return {
            page: page,
            limit: limit,
            total: await query.getCount(),
            data: await query.getMany(),
          }
      }

      async findByTravelId(travelId: string): Promise<Day[]> {
        return await this.createQueryBuilder('day')
          .leftJoinAndSelect('day.travel', 'travel')
          .leftJoinAndSelect('day.timeSlots', 'timeSlots')
          .where('travel.id = :travelId', { travelId })
          .getMany();
      }
    
      async findOneDay(id: string) {
          return await this.createQueryBuilder('day')
          .leftJoinAndSelect('day.travel', 'travel')
          .leftJoinAndSelect('day.timeSlots', 'timeSlots')
          .where('day.id = :id', { id })
          .getOne()
      }
    
      async updateDay(id: string, updateDayDto: UpdateDayDto) {
          return await this.update(id, updateDayDto)
      }
    
      async removeDay(id: string) {
          return await this.softDelete(id)
      }
}
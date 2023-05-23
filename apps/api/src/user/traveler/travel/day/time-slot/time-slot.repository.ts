import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

import { TimeSlot } from "./entities/time-slot.entity";
import { CreateTimeSlotDto } from "./dto/create-time-slot.dto";
import { ApiLimitResourceQuery } from "@travel-tailor/types";
import { UpdateTimeSlotDto } from "./dto/update-time-slot.dto";

export class TimeSlotRepository extends Repository<TimeSlot> {
    constructor(@InjectDataSource() datasource: DataSource) {
        super(TimeSlot, datasource.createEntityManager());
    }

    async createTimeSlot(createTimeSlotDto: CreateTimeSlotDto) {
          const timeSlot = this.create(createTimeSlotDto);
          return await this.save(timeSlot)
      }
    
      async findAllTimeSlot(queries: ApiLimitResourceQuery) {
          let { page, limit, sortedBy } = queries;
          page = page ? +page : 1;
          limit = limit ? +limit : 10;
    
          const query = this.createQueryBuilder('timeSlot')
          .leftJoinAndSelect('timeSlot.day', 'day')
          .leftJoinAndSelect('timeSlot.activity', 'activity')
    
          if(sortedBy) {
            query.orderBy('timeSlot.createdAt', sortedBy)
          } else {
            query.orderBy('timeSlot.createdAt', 'DESC')
          }
    
          return {
            page: page,
            limit: limit,
            total: await query.getCount(),
            data: await query.skip((page - 1) * limit).take(limit).getMany(),
          }
      }
    
      async findOneTimeSlot(id: string) {
          return await this.createQueryBuilder('timeSlot')
          .leftJoinAndSelect('timeSlot.day', 'day')
          .leftJoinAndSelect('timeSlot.activity', 'activity')
          .where('timeSlot.id = :id', { id })
          .getOne()
      }
    
      async updateTimeSlot(id: string, updateTimeSlotDto: UpdateTimeSlotDto) {
          const timeSlot = await this.createQueryBuilder('timeSlot')
          .leftJoinAndSelect('timeSlot.day', 'day')
          .leftJoinAndSelect('timeSlot.activity', 'activity')
          .where('timeSlot.id = :id', { id })
          .getOne()
    
          timeSlot.startTime = updateTimeSlotDto.startTime ? updateTimeSlotDto.startTime : timeSlot.startTime;
          timeSlot.endTime = updateTimeSlotDto.endTime ? updateTimeSlotDto.endTime : timeSlot.endTime;
          timeSlot.day = updateTimeSlotDto.day ? updateTimeSlotDto.day : timeSlot.day;
          timeSlot.activity = updateTimeSlotDto.activity ? updateTimeSlotDto.activity : timeSlot.activity;
    
          return await this.save(timeSlot)
      }
    
      async removeTimeSlot(id: string) {
          return await this.softDelete(id)
      }
}
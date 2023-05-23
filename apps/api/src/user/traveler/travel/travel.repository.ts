import { Repository, DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

import { Travel } from "./entities/travel.entity";
import { CreateTravelDto } from "./dto/create-travel.dto";
import { ApiLimitResourceQuery } from "@travel-tailor/types";

export class TravelRepository extends Repository<Travel> {
    constructor (@InjectDataSource() private readonly datasource: DataSource) {
        super(Travel, datasource.createEntityManager());
    }

    async createTravel(createTravelDto: CreateTravelDto) {
          const travel = this.create(createTravelDto);
          return await this.save(travel);
      }
    
      async findAllTravel(queries: ApiLimitResourceQuery) {
          let { page, limit, sortedBy, departureCity, destinationCity, departureDate, returnDate } = queries;
          page = page ? +page : 1;
          limit = limit ? +limit : 10;
          
          const query = this.createQueryBuilder('travel')
          .leftJoinAndSelect('travel.traveler', 'traveler')
          .leftJoinAndSelect('travel.days', 'day')
          .leftJoinAndSelect('day.timeSlots', 'timeSlot')
          .leftJoinAndSelect('timeSlot.activity', 'activity')
          .leftJoinAndSelect('activity.detail', 'detail')
    
          if(sortedBy) {
            query.orderBy('travel.createdAt', sortedBy)
          } else {
            query.orderBy('travel.createdAt', 'DESC')
          }
    
          if(departureCity) {
            query.andWhere('travel.departureCity = :departureCity', { departureCity })
          }
    
          if(destinationCity) {
            query.andWhere('travel.destinationCity = :destinationCity', { destinationCity })
          }
    
          if(departureDate) {
            query.andWhere('travel.departureDate = :departureDate', { departureDate })
          }
    
          if(returnDate) {
            query.andWhere('travel.returnDate = :returnDate', { returnDate })
          }
    
          return {
            page: page,
            limit: limit,
            total: await query.getCount(),
            data: await query.skip((page - 1) * limit).take(limit).getMany(),
          };
      }
    
      async findAllTravelByTravelerId(travelerId: string, page: number, limit: number) {
          const skip = (page - 1) * limit;
          const take = limit;
    
          const query = this.createQueryBuilder('travel')
          .leftJoinAndSelect('travel.traveler', 'traveler')
          .where('traveler.id = :id', { id: travelerId })
          .orderBy('travel.createdAt', 'DESC')
    
          return {
            page: page,
            limit: limit,
            total: await query.getCount(),
            data: await query.skip((page - 1) * limit).take(limit).getMany(),
          }
      }
    
      async findOneTravel(id: string) {
          return await this.createQueryBuilder('travel')
            .where('travel.id = :id', { id })
            .leftJoinAndSelect('travel.traveler', 'traveler')
            .leftJoinAndSelect('travel.days', 'day')
            .orderBy('day.date', 'ASC')
            .leftJoinAndSelect('day.timeSlots', 'timeSlot')
            .leftJoinAndSelect('timeSlot.activity', 'activity')
            .leftJoinAndSelect('activity.detail', 'detail')
            .getOne();
      }
    
      async updateTravel(id: string, updateTravelDto) {
          return this.update(id, updateTravelDto);
      }
    
      async removeTravel(id: string) {
          return await this.softDelete(id);
      }
}
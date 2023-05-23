import { DataSource, Repository } from "typeorm";
import { Taste } from "./entities/taste.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { CreateTasteDto } from "./dto/create-taste.dto";
import { ApiLimitResourceQuery } from "@travel-tailor/types";
import { UpdateTasteDto } from "./dto/update-taste.dto";

export class TasteRepository extends Repository<Taste> {
    constructor (@InjectDataSource() private readonly datasource: DataSource) {
        super(Taste, datasource.createEntityManager());
    }

    async createTaste(createTasteDto: CreateTasteDto) {
          const taste = await this.create(createTasteDto);
          return this.save(taste);
      }
    
      async findAllTaste(queries: ApiLimitResourceQuery) {
          let { page, limit, sortedBy, name } = queries;
          page = page ? +page : 1;
          limit = limit ? +limit : 10;
    
          const query = this.createQueryBuilder('taste')
          .leftJoinAndSelect('taste.traveler', 'traveler')
    
          if(sortedBy) {
            query.orderBy('taste.createdAt', sortedBy)
          } else {
            query.orderBy('taste.createdAt', 'DESC')
          }
    
          if(name) {
            query.andWhere('taste.name = :name', { name })
          }
    
          return {
            page: page,
            limit: limit,
            total: await query.getCount(),
            data: await query.skip((page - 1) * limit).take(limit).getMany(),
          }
      }
    
      async findOneTaste(id: string) {
          return this.createQueryBuilder('taste')
            .where('taste.id = :id', { id })
            .leftJoinAndSelect('taste.traveler', 'traveler')
            .getOne();
      }
    
      async updateTaste(id: string, updateTasteDto: UpdateTasteDto) {
          return this.update(id, updateTasteDto);
      }
    
      async removeTaste(id: string) {
          return this.softDelete(id);
      }
}
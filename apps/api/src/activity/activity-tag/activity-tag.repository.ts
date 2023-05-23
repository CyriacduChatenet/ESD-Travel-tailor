import { DataSource, Repository } from "typeorm";

import { ActivityTag } from "./entities/activity-tag.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { CreateActivityTagDto } from "./dto/create-activity-tag.dto";
import { ActivityTagQuery } from "@travel-tailor/types";
import { UpdateActivityTagDto } from "./dto/update-activity-tag.dto";

export class ActivityTagRepository extends Repository<ActivityTag> {
    constructor(@InjectDataSource() private readonly datasource: DataSource) {
        super(ActivityTag, datasource.createEntityManager());
    }

    async createActivityTag(createActivityTagDto: CreateActivityTagDto) {
          const activityTag = this.create(createActivityTagDto)
          return await this.save(activityTag)
      }
    
      async findAllActivityTag(queries: ActivityTagQuery) {
          let { page, limit, name } = queries;
          page = page ? +page : 1;
          limit = limit ? +limit : 10;
    
          const query = this.createQueryBuilder('activityTag')
          .leftJoinAndSelect('activityTag.activities', 'activity')
    
          if(name) {
            query.where('activityTag.name LIKE :name', { name: `%${name}%` })
          }
          
          return {
            page,
            limit,
            total: await query.getCount(),
            data: await query.skip((page - 1) * limit).take(limit).getMany()
          }
      }
    
      findOneActivityTag(name: string) {
          return this.createQueryBuilder('activityTag')
            .leftJoinAndSelect('tag.activities', 'activity')
            .where('activityTag.name = :name', { name })
            .getOne()
      }
    
      async updateActivityTag(id: string, updateActivityTagDto: UpdateActivityTagDto) {
          const tag = await this.findOneBy({ id })
    
          tag.name = updateActivityTagDto.name
          tag.activities = updateActivityTagDto.activities
    
          return await this.save(tag)
      }
    
      async removeActivityTag(id: string) {
          return this.softDelete(id)
      }
}
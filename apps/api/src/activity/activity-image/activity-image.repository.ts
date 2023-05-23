import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { ApiLimitResourceQuery } from "@travel-tailor/types";

import { ActivityImage } from "./entities/activity-image.entity";
import { CreateActivityImageDto } from "./dto/create-activity-image.dto";
import { UpdateActivityImageDto } from "./dto/update-activity-image.dto";

export class ActivityImageRepository extends Repository<ActivityImage> {
    constructor(@InjectDataSource() private readonly datasource: DataSource) {
        super(ActivityImage, datasource.createEntityManager());
    }


    async createActivityImage(createActivityImageDto: CreateActivityImageDto) {
          const activityImage = await this.create(createActivityImageDto);
          return await this.save(activityImage);
      }
    
      async findAllActivityImage(queries: ApiLimitResourceQuery) {
          let { page, limit, sortedBy } = queries;
          page = page ? +page : 1;
          limit = limit ? +limit : 10;
    
          const query = this.createQueryBuilder('activityImage')
            .leftJoinAndSelect('activityImage.activity', 'activity')
            .leftJoinAndSelect('activityImage.uploadFile', 'uploadFile')
    
          if (sortedBy) {
            query.orderBy('activityImage.createdAt', sortedBy);
          } else {
            query.orderBy('activityImage.createdAt', 'DESC');
          }
    
          return {
            page: page,
            limit: limit,
            total: await query.getCount(),
            data: await query.skip((page - 1) * limit).take(limit).getMany()
          };
      }
    
      findOneActivityImage(id: string) {
          return this.createQueryBuilder('activityImage')
            .leftJoinAndSelect('activityImage.activity', 'activity')
            .leftJoinAndSelect('activityImage.uploadFile', 'uploadFile')
            .where('activityImage.id = :id', { id })
            .getOne();
      }
    
      updateActivityImage(id: string, updateActivityImageDto: UpdateActivityImageDto) {
          return this.update(id, updateActivityImageDto);
      }
    
      removeActivityImage(id: string) {
          return this.softDelete(id);
      }
}
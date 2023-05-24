import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

import { Activity } from "./entities/activity.entity";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { ActivityImage } from "./activity-image/entities/activity-image.entity";
import { ActivityQuery, ActivityTag } from "@travel-tailor/types";
import { UpdateActivityDto } from "./dto/update-activity.dto";
import { NotFoundException } from "@nestjs/common";

export class ActivityRepository extends Repository<Activity> {
    constructor (@InjectDataSource() private readonly datasource: DataSource) {
        super(Activity, datasource.createEntityManager());
    }

    async createActivity(createActivityDto: CreateActivityDto, activityImage: ActivityImage, slug: string) {
          const activity = this.create({
            ...createActivityDto,
            image: activityImage,
            slug: slug,
          })
          return this.save(activity)
      }
    
      async findAllActivity(queries: ActivityQuery) {
          let { limit, page, sortedBy, name, tags, location, duration, closed_day, opening_at, closing_at, marks } = queries;
          page = page ? +page : 1;
          limit = limit ? +limit : 10;
    
          let query = this.createQueryBuilder('activity')
            .leftJoinAndSelect('activity.image', 'image')
            .leftJoinAndSelect('activity.marks', 'marks')
            .leftJoinAndSelect('image.uploadFile', 'uploadFile')
            .leftJoinAndSelect('activity.comments', 'comments')
            .leftJoinAndSelect("comments.marks", "commentMark")
            .leftJoinAndSelect('activity.advertiser', 'advertiser')
            .leftJoinAndSelect('activity.tags', 'tag')
            .leftJoinAndSelect('activity.timeSlots', 'timeSlot')
            .leftJoinAndSelect('activity.detail', 'detail')
            .leftJoinAndSelect("detail.closingDays", "closingDay")
            .leftJoinAndSelect("detail.schedules", "schedule")  
      
          if (tags) {
            const tagList = tags.split(',').map(tag => tag.trim());
            query = query.andWhere('tag.name IN (:...tags)', { tags: tagList });
          }
    
          if(sortedBy) {
            query.orderBy('activity.createdAt', sortedBy)
          }
          if(name) {
            query.andWhere('activity.name = :name', { name })
          }
    
          if(location) {
            query.andWhere('detail.location = :location', { location })
          }
          if(duration) {
            query.andWhere('detail.duration = :duration', { duration })
          }
    
          if(marks) {
            query.andWhere('activity.mark = :mark', { marks: marks.global })
          }
            
          if (closed_day) {
            const closedDaysList = tags.split(',').map(closingDay => closingDay.trim());
            query = query.andWhere('closingDay.date IN (:...closingDays)', { closingDays: closedDaysList });
          }
    
          if(opening_at) {
            query.andWhere('schedule.opening_at = :opening_at', { opening_at })
          }
    
          if(closing_at) {
            query.andWhere('schedule.closing_at = :closing_at', { closing_at })
          }
    
          return {
            page: page,
            limit: limit,
            total: await query.getCount(),
            data: await query.skip((page - 1) * limit).take(limit).getMany()
          }
      }
    
      async findAllActivityByTags(tags: ActivityTag[]) {
        return await this.createQueryBuilder('activity')
        .leftJoinAndSelect('activity.image', 'image')
        .leftJoinAndSelect('activity.marks', 'marks')
        .leftJoinAndSelect('image.uploadFile', 'uploadFile')
        .leftJoinAndSelect('activity.comments', 'comments')
        .leftJoinAndSelect("comments.marks", "commentMark")
        .leftJoinAndSelect('activity.advertiser', 'advertiser')
        .leftJoinAndSelect('activity.tags', 'tag')
        .leftJoinAndSelect('activity.timeSlots', 'timeSlot')
        .leftJoinAndSelect('activity.detail', 'detail')
        .leftJoinAndSelect("detail.closingDays", "closingDay")
        .leftJoinAndSelect("detail.schedules", "schedule")
        .andWhere('tag.name IN (:...tags)', { tags })
        .getMany()
        }

        async findAllActivityByAdvertiserId(advertiserId: string, page: number, limit: number) {
          const skip = (page - 1) * limit;
          const take = limit;
    
          const query = this.createQueryBuilder('activity')
          .leftJoinAndSelect('activity.advertiser', 'advertiser')
          .leftJoinAndSelect('activity.image', 'image')
          .leftJoinAndSelect('activity.marks', 'marks')
          .leftJoinAndSelect('image.uploadFile', 'uploadFile')
          .leftJoinAndSelect('activity.tags', 'tag')
          .leftJoinAndSelect('activity.detail', 'detail')
          .leftJoinAndSelect("detail.closingDays", "closingDay")
          .leftJoinAndSelect("detail.schedules", "schedule")
          .where('advertiser.id = :id', { id: advertiserId })
          .orderBy('activity.createdAt', 'DESC')
    
          return {
            page: page,
            limit: limit,
            total: await query.getCount(),
            data: await query.skip((page - 1) * limit).take(limit).getMany(),
          }
      }
    
      async findOneActivity(id: string) {
          return await this.createQueryBuilder('activity')
            .leftJoinAndSelect('activity.image', 'image')
            .leftJoinAndSelect('activity.marks', 'marks')
            .leftJoinAndSelect('image.uploadFile', 'uploadFile')
            .leftJoinAndSelect('activity.comments', 'comments')
            .leftJoinAndSelect("comments.marks", "commentMark")
            .leftJoinAndSelect('activity.advertiser', 'advertiser')
            .leftJoinAndSelect('activity.tags', 'tag')
            .leftJoinAndSelect('activity.timeSlots', 'timeSlot')
            .leftJoinAndSelect('activity.detail', 'detail')
            .leftJoinAndSelect("detail.closingDays", "closingDay")
            .leftJoinAndSelect("detail.schedules", "schedule")
            .where('activity.id = :id', { id })
            .getOne()
      }
    
      async findOneActivityByName(slug: string) {
          return await this.createQueryBuilder('activity')
            .leftJoinAndSelect('activity.image', 'image')
            .leftJoinAndSelect('activity.marks', 'marks')
            .leftJoinAndSelect('image.uploadFile', 'uploadFile')
            .leftJoinAndSelect('activity.comments', 'comments')
            .leftJoinAndSelect("comments.marks", "commentMark")
            .leftJoinAndSelect('comments.traveler', 'traveler')
            .leftJoinAndSelect('traveler.user', 'user')
            .leftJoinAndSelect('activity.advertiser', 'advertiser')
            .leftJoinAndSelect('activity.tags', 'tag')
            .leftJoinAndSelect('activity.timeSlots', 'timeSlot')
            .leftJoinAndSelect('activity.detail', 'detail')
            .leftJoinAndSelect("detail.closingDays", "closingDay")
            .leftJoinAndSelect("detail.schedules", "schedule")
            .where('activity.slug = :slug', { slug })
            .getOne()
      }
    
      async updateActivity(id: string, updateActivityDto: UpdateActivityDto) {
          const activity = await this.createQueryBuilder('activity')
            .leftJoinAndSelect('activity.detail', 'detail')
            .leftJoinAndSelect('activity.marks', 'marks')
            .leftJoinAndSelect('activity.image', 'image')
            .leftJoinAndSelect('image.uploadFile', 'uploadFile')
            .leftJoinAndSelect('activity.comments', 'comments')
            .leftJoinAndSelect("comments.marks", "commentMark")
            .leftJoinAndSelect('activity.advertiser', 'advertiser')
            .leftJoinAndSelect('activity.timeSlots', 'timeSlot')
            .leftJoinAndSelect('activity.tags', 'tags')
            .where('activity.id = :id', { id })
            .getOne()
          
          if(!activity) throw new NotFoundException('Activity not found')
    
          if(updateActivityDto?.detail && updateActivityDto?.detail?.closingDays) {
            activity.detail.closingDays = updateActivityDto?.detail.closingDays
          }
    
          if(updateActivityDto?.detail && updateActivityDto?.detail?.schedules) {
            activity.detail.schedules = updateActivityDto?.detail.schedules
          }
    
          if(updateActivityDto?.timeSlots) {
            activity.timeSlots = updateActivityDto?.timeSlots
          }
    
          if(updateActivityDto?.name) {
            activity.name = updateActivityDto?.name
          }
    
          if(updateActivityDto?.marks) {
            activity.marks = updateActivityDto?.marks as any
          }
    
          if(updateActivityDto?.image && updateActivityDto.image.uploadFile){
            activity.image.uploadFile = updateActivityDto.image.uploadFile
          }
    
          if(updateActivityDto?.detail && updateActivityDto?.detail.duration){
            activity.detail.duration = updateActivityDto?.detail.duration
          }
    
          if(updateActivityDto?.detail && updateActivityDto?.detail.location){
            activity.detail.location = updateActivityDto?.detail.location
          }
    
          if(updateActivityDto?.comments){
            activity.comments = updateActivityDto?.comments
          }
    
          if(updateActivityDto?.advertiser){
            activity.advertiser = updateActivityDto?.advertiser
          }
    
          if(updateActivityDto?.tags){
            activity.tags = updateActivityDto?.tags
          }
    
          return this.save(activity)
      }
    
      async removeActivity(id: string) {
          return await this.softDelete(id)
      }
}
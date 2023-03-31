import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiLimitResourceQuery, FileData } from '@travel-tailor/types';
import { UploadFileService } from 'src/upload-file/upload-file.service';
import { Repository } from 'typeorm';

import { CreateActivityImageDto } from './dto/create-activity-image.dto';
import { UpdateActivityImageDto } from './dto/update-activity-image.dto';
import { ActivityImage } from './entities/activity-image.entity';

@Injectable()
export class ActivityImageService {
  constructor(
    @InjectRepository(ActivityImage)
    private activityImageRepository: Repository<ActivityImage>,
    private uploadFileService: UploadFileService,
  ) {}

  async create(createActivityImageDto: CreateActivityImageDto, files: FileData[]) {
    try {
      if(files) {
        const uploadFile = await this.uploadFileService.create(files[0]) as unknown as { Location: string };
      
        const activityImage = this.activityImageRepository.create({
          source: uploadFile.Location,
      });
        return await this.activityImageRepository.save(activityImage);
      }
      
      const activityImage = this.activityImageRepository.create(createActivityImageDto);
      return await this.activityImageRepository.save(activityImage);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  findAll(queries: ApiLimitResourceQuery) {
    try {
      let { page, limit } = queries;
      page = page ? +page : 1;
      limit = limit ? +limit : 10;

      return this.activityImageRepository
        .createQueryBuilder('activityImage')
        .leftJoinAndSelect('activityImage.activity', 'activity')
        .orderBy('activityImage.id', 'DESC')
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  findOne(id: string) {
    try {
      return this.activityImageRepository
        .createQueryBuilder('activityImage')
        .leftJoinAndSelect('activityImage.activity', 'activity')
        .where('activityImage.id = :id', { id })
        .getOne();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateActivityImageDto: UpdateActivityImageDto, files: FileData[]) {
    try {
      if(files) {
        const uploadFile = await this.uploadFileService.create(files[0]) as unknown as { Location: string };
        return await this.activityImageRepository.update(id, { source: uploadFile.Location });
      }

      return await this.activityImageRepository.update(id, updateActivityImageDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  remove(id: string) {
    try {
      return this.activityImageRepository.softDelete(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}

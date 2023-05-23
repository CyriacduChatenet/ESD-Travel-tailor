import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

import { UploadFile } from "./entity/upload-file.entity";
import { ActivityImage } from "../activity/activity-image/entities/activity-image.entity";

export class UploadFileRepository extends Repository<UploadFile> {
    constructor (@InjectDataSource() private readonly datasource: DataSource) {
        super(UploadFile, datasource.createEntityManager());
    }

    async createUploadFile(file, activityImage: ActivityImage) {
        const uploadFile = await this.create({...file, image: activityImage})
        return await this.save(uploadFile)
      }
    
      async updateUploadFile(id: string, updateUploadFileDto) {
        return await this.update(id, updateUploadFileDto)
      }
}
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { S3 } from 'aws-sdk'
require('aws-sdk/lib/maintenance_mode_message').suppress = true

import { UploadFile } from './entity/upload-file.entity'

@Injectable()
export class UploadFileService {
  private s3
  private bucketName

  constructor(
    @InjectRepository(UploadFile)
    private uploadFileRepository: Repository<UploadFile>
  ) {
    this.s3 = new S3({
      region: process.env.API_AWS_BUCKET_REGION,
      accessKeyId: process.env.API_AWS_ACCESS_KEY,
      secretAccessKey: process.env.API_AWS_SECRET_KEY,
    })
    this.bucketName = process.env.API_AWS_BUCKET_NAME
  }

  async create(filesData, user, activityImage) {
    const file = await this.uploadFileAws(user, filesData)
    const uploadFile = await this.uploadFileRepository.create({...file, image: activityImage})
    return await this.uploadFileRepository.save(uploadFile)
  }

  async uploadFileAws(user, fileData) {
    const fileName = `${Date.now()}.${fileData.originalname.split('.').pop()}`
    const uploadParams = {
      Bucket: this.bucketName,
      Body: fileData.buffer,
      Key: `${user.id}/${fileName}`,
    }

    return this.s3.upload(uploadParams).promise()
  }

  async update(id: string, updateUploadFileDto) {
    return await this.uploadFileRepository.update(id, updateUploadFileDto)
  }
}

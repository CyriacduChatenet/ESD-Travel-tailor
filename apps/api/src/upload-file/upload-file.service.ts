import { Injectable, UnauthorizedException } from '@nestjs/common'
import { S3 } from 'aws-sdk'
require('aws-sdk/lib/maintenance_mode_message').suppress = true

import { UploadFileRepository } from './upload-file.repository'

@Injectable()
export class UploadFileService {
  private s3
  private bucketName

  constructor( private readonly uploadFileRepository: UploadFileRepository) {
    this.s3 = new S3({
      region: process.env.API_AWS_BUCKET_REGION,
      accessKeyId: process.env.API_AWS_ACCESS_KEY,
      secretAccessKey: process.env.API_AWS_SECRET_KEY,
    })
    this.bucketName = process.env.API_AWS_BUCKET_NAME
  }

  async create(filesData, user, activityImage) {
    try {
      const file = await this.uploadFileAws(user, filesData)
      return await this.uploadFileRepository.createUploadFile(file, activityImage)
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Unauthorized to create upload file',
        error,
      })
    }
  }

  async uploadFileAws(user, fileData) {
    try {
      const fileName = `${Date.now()}.${fileData.originalname.split('.').pop()}`
      const uploadParams = {
        Bucket: this.bucketName,
        Body: fileData.buffer,
        Key: `${user.id}/${fileName}`,
      }
  
      return this.s3.upload(uploadParams).promise()
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Unauthorized to upload file aws',
        error,
      })
    }
  }

  async update(id: string, updateUploadFileDto) {
    try {
      return await this.uploadFileRepository.updateUploadFile(id, updateUploadFileDto)
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Unauthorized to update upload file',
        error,
      })
    }
  }
}

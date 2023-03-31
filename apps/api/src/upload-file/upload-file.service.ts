import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { FileData, User } from '@travel-tailor/types'
import { S3 } from 'aws-sdk'
import { Repository } from 'typeorm'

import { UploadFile } from './entities/upload-file.entity'

@Injectable()
export class UploadFileService {
  private s3
  private bucketName

  constructor(
    @InjectRepository(UploadFile)
    private uploadFileRepository: Repository<UploadFile>,
    private configService: ConfigService
  ) {
    this.s3 = new S3({
      region: this.configService.get('AWS_BUCKET_REGION'),
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
    })
    this.bucketName = this.configService.get('AWS_BUCKET_NAME')
  }

  async create(filesData: FileData) {
    try {
        const file = await this.uploadFileAws(filesData)

        const uploadFile = this.uploadFileRepository.create(file)
        return await this.uploadFileRepository.save(uploadFile)
    } catch (error) {
        throw new BadRequestException(error)
    }
  }

  async uploadFileAws(fileData: FileData){
    try {
        const fileName = `${Date.now()}.${fileData.originalname.split('.').pop()}`
    
    const uploadParams = {
        Bucket: this.bucketName,
        Body: fileData.buffer,
        Key: `${fileName}`,
    }

    return this.s3.upload(uploadParams).promise()
    } catch (error) {
        throw new ForbiddenException(error)
    }
  }
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { S3 } from 'aws-sdk'
import { Repository } from 'typeorm'

import { CreateUploadFileDto } from './dto/create-upload-file.dto'
import { UpdateUploadFileDto } from './dto/update-upload-file.dto'
import { UploadFile } from './entities/upload-file.entity'

@Injectable()
export class UploadFileService {
  private s3
  private bucketName

  constructor(
    @InjectRepository(UploadFile)
    private uploadFileRepository: Repository<UploadFile>
  ) {
    this.s3 = new S3({
      region: process.env.AWS_BUCKET_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    })
    this.bucketName = process.env.AWS_BUCKET_NAME
  }

  async create(filesData, user) {
    const file = await this.uploadFileAws(user, filesData)

    console.log(file)

    const uploadFile = await this.uploadFileRepository.create(file)
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
}

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Activity } from '../../../activity/entities/activity.entity'
import { Timestamp } from '../../../config/utils/timestamp.util'
import { UploadFile } from 'src/upload-file/entity/upload-file.entity'

@Entity()
export class ActivityImage extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  source: string

  @OneToOne(() => Activity, (activity) => activity.image)
  activity: Activity

  @OneToOne(() => UploadFile, (uploadFile) => uploadFile.image)
  @JoinColumn()
  uploadFile: UploadFile
}

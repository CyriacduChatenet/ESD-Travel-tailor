import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Timestamp } from "../../config/utils/timestamp.util";
import { ActivityImage } from "../../activity/activity-image/entities/activity-image.entity";

@Entity()
export class UploadFile extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    ETag: string;

    @Column()
    Location: string;

    @Column({ nullable: true })
    key: string;

    @Column({ nullable: true })
    Key: string;

    @Column({ nullable: true })
    Bucket: string;

    @OneToOne(() => ActivityImage, image => image.uploadFile)
    image: ActivityImage;
}
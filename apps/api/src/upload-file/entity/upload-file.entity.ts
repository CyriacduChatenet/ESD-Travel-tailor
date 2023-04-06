import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Timestamp } from "../../config/utils/timestamp.util";

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
}
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

export class Timestamp {
  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date | null
}

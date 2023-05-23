import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { ApiLimitResourceQuery } from "@travel-tailor/types";

import { CommentMark } from "./entities/comment-mark.entity";
import { CreateCommentMarkDto } from "./dto/create-comment-mark.dto";
import { UpdateCommentMarkDto } from "./dto/update-comment-mark.dto";

export class CommentMarkRepository extends Repository<CommentMark> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(CommentMark, dataSource.createEntityManager());
  }

  async createCommentMark(createCommentMarkDto: CreateCommentMarkDto) {
    const commentMark = this.create(createCommentMarkDto);
    return await this.save(commentMark);
  }

  async findAllCommentMark(queries: ApiLimitResourceQuery) {
    let { page, limit, sortedBy } = queries;
    page = page ? +page : 1;
    limit = limit ? +limit : 10;

    const query = this.createQueryBuilder('commentMark')
    .leftJoinAndSelect('commentMark.comment', 'comment')

    if (sortedBy) {
        query.orderBy('commentMark.createdAt', sortedBy);
    } else {
        query.orderBy('commentMark.createdAt', 'DESC');
    }

    return {
        page: page,
        limit: limit,
        total: await query.getCount(),
        data: await query.skip((page - 1) * limit).take(limit).getMany()
    }
  }

  async findOneCommentMark(id: string) {
    return await this.createQueryBuilder('commentMark')
      .leftJoinAndSelect('commentMark.comment', 'comment')
      .where('commentMark.id = :id', { id })
      .getOne();
  }

  async updateCommentMark(id: string, updateCommentMarkDto: UpdateCommentMarkDto) {
    return await this.update(id, updateCommentMarkDto);
  }

  async removeCommentMark(id: string) {
    return await this.softDelete(id);
  }
}
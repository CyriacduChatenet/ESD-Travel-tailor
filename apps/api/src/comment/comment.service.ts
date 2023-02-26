import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    return await this.commentRepository.save(createCommentDto);
  }

  async findAll() {
    return await this.commentRepository.find({
      relations: {
        traveler: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.commentRepository.findOne({
      where: { id },
      relations: {
        traveler: true,
      },
    });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const commentInDB: any = await this.commentRepository.findOneById(id);
    commentInDB.content = updateCommentDto.content;
    commentInDB.likes = updateCommentDto.likes;
    commentInDB.traveler = updateCommentDto.traveler;
    return this.commentRepository.save(commentInDB);
  }

  async remove(id: string) {
    return await this.commentRepository.softDelete(id);
  }
}

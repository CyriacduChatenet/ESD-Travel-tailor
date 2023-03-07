import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Role } from '../auth/decorators/role.enum'
import { Roles } from '../auth/decorators/roles.decorator'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto)
  }

  @Get()
  findAll() {
    return this.commentService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.commentService.remove(id)
  }
}

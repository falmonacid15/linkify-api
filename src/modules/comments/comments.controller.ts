import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  ValidationPipe,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaExceptionFilter } from '../../core/filters/prisma-exception.filter';
import { ParseObjectPipe } from '../../core/pipes/parse-object.pipe';

@UseFilters(PrismaExceptionFilter)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ transform: true })) data: CreateCommentDto,
  ) {
    return this.commentsService.create(data);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage?: number,
    @Query('where', ParseObjectPipe) where?: Prisma.CommentWhereUniqueInput,
    @Query('orderBy', ParseObjectPipe)
    orderBy?: Prisma.CommentOrderByWithRelationInput,
  ) {
    return this.commentsService.findAll(page, perPage, where, orderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCommentDto) {
    return this.commentsService.update({ id }, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove({ id });
  }
}

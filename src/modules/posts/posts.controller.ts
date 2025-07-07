import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ParseObjectPipe } from '../../core/pipes/parse-object.pipe';
import { FilesValidationPipe } from '../../core/pipes/files-validator.pipe';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 5 },
      { name: 'videos', maxCount: 5 },
    ]),
  )
  create(
    @Body() data: CreatePostDto,
    @UploadedFiles(new FilesValidationPipe())
    files: {
      images?: Express.Multer.File[];
      videos?: Express.Multer.File[];
    },
  ) {
    return this.postsService.create(data, files);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage?: number,
    @Query('where', ParseObjectPipe) where?: Prisma.PostWhereUniqueInput,
    @Query('orderBy', ParseObjectPipe)
    orderBy?: Prisma.PostOrderByWithRelationInput,
  ) {
    return this.postsService.findAll(page, perPage, where, orderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne({ id });
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 5 },
      { name: 'videos', maxCount: 5 },
    ]),
  )
  update(
    @Param('id') id: string,
    @Body() data: UpdatePostDto,
    @UploadedFiles(new FilesValidationPipe())
    files: {
      images?: Express.Multer.File[];
      videos?: Express.Multer.File[];
    },
  ) {
    return this.postsService.update({ id }, data, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove({ id });
  }
}

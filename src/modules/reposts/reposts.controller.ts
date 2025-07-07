import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { RepostsService } from './reposts.service';
import { CreateRepostDto } from './dto/create-repost.dto';
import { UpdateRepostDto } from './dto/update-repost.dto';
import { PrismaExceptionFilter } from '../../core/filters/prisma-exception.filter';

@UseFilters(PrismaExceptionFilter)
@Controller('reposts')
export class RepostsController {
  constructor(private readonly repostsService: RepostsService) {}

  @Post()
  create(@Body() data: CreateRepostDto) {
    return this.repostsService.create(data);
  }

  @Get()
  findAll() {
    return this.repostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repostsService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateRepostDto) {
    return this.repostsService.update({ id }, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repostsService.remove({ id });
  }
}

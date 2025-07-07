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
} from '@nestjs/common';

import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { PrismaExceptionFilter } from '../../core/filters/prisma-exception.filter';

@UseFilters(PrismaExceptionFilter)
@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ transform: true })) data: CreateReactionDto,
  ) {
    return this.reactionsService.create(data);
  }

  @Get()
  findAll() {
    return this.reactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reactionsService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true })) data: UpdateReactionDto,
  ) {
    return this.reactionsService.update({ id }, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reactionsService.remove({ id });
  }
}

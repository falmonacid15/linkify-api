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
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { FriendshipsService } from './friendships.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { ParseObjectPipe } from '../../core/pipes/parse-object.pipe';

@Controller('friendships')
export class FriendshipsController {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  @Post()
  create(@Body() data: CreateFriendshipDto) {
    return this.friendshipsService.create(data);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage?: number,
    @Query('where', ParseObjectPipe) where?: Prisma.FriendshipWhereUniqueInput,
    @Query('orderBy', ParseObjectPipe)
    orderBy?: Prisma.FriendshipOrderByWithRelationInput,
  ) {
    return this.friendshipsService.findAll(page, perPage, where, orderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendshipsService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateFriendshipDto) {
    return this.friendshipsService.update({ id }, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendshipsService.remove({ id });
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';

import { NotificationsService } from './notifications.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Prisma } from '@prisma/client';
import { ParseObjectPipe } from 'src/core/pipes/parse-object.pipe';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage?: number,
    @Query('where', ParseObjectPipe)
    where?: Prisma.NotificationWhereUniqueInput,
    @Query('orderBy', ParseObjectPipe)
    orderBy?: Prisma.NotificationOrderByWithRelationInput,
  ) {
    return this.notificationsService.findAll(page, perPage, where, orderBy);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateNotificationDto) {
    return this.notificationsService.update({ id }, data);
  }

  @Delete(':id')
  delete() {}
}

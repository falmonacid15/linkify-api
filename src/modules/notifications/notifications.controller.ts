import { Controller, Delete, Get, Patch } from '@nestjs/common';

import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('')
  findAll() {
    return this.notificationsService.findAll();
  }

  @Patch(':id')
  update() {}

  @Delete(':id')
  delete() {}
}

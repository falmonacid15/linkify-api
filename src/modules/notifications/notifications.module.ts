import { Module } from '@nestjs/common';

import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsGateway } from './notifications.gateway';
import { PrismaService } from '../../Prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationsGateway,
    PrismaService,
    UsersService,
  ],
})
export class NotificationsModule {}

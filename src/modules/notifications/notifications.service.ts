import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from '../../Prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateNotificationDto) {
    const { userId, ...notificationData } = data;

    return await this.prisma.notification.create({
      data: {
        ...notificationData,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(where?: Prisma.NotificationWhereInput) {
    return await this.prisma.notification.findMany({
      include: {
        user: true,
      },
    });
  }

  async update(
    where: Prisma.NotificationWhereUniqueInput,
    data: Prisma.NotificationUpdateInput,
  ) {
    return await this.prisma.notification.update({
      where,
      data,
    });
  }

  async delete(where: Prisma.NotificationWhereUniqueInput) {
    return await this.prisma.notification.delete({
      where,
    });
  }
}

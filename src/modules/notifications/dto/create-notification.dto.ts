import { NotificationType } from '@prisma/client';

export class CreateNotificationDto {
  userId: string;
  type: NotificationType;
  content?: string;
  isRead?: boolean;
}

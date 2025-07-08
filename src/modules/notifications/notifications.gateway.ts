import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';
import { UsersService } from '../users/users.service';

@WebSocketGateway()
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly userService: UsersService,
  ) {}

  @WebSocketServer()
  server: Server;

  private connectedUsers: Map<string, string> = new Map();

  async handleConnection(@ConnectedSocket() client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedUsers.set(userId, client.id);
      await this.userService.update(
        { id: userId },
        {
          isOnline: true,
        },
      );
      console.log(`🟢 Usuario ${userId} conectado con socket ${client.id}`);
    }
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedUsers.delete(userId);
      await this.userService.update(
        { id: userId },
        {
          isOnline: false,
          lastSeen: new Date().toISOString(),
        },
      );
      console.log(`🔴 Usuario ${userId} desconectado con socket ${client.id}`);
    }
  }

  @SubscribeMessage('sendNotification')
  async handleSendNotification(
    @ConnectedSocket() client: Socket,
    @MessageBody() notification: CreateNotificationDto,
  ) {
    const savedNotification =
      await this.notificationsService.create(notification);

    const receiverId = notification.userId;
    const socketId = this.connectedUsers.get(receiverId);

    if (socketId) {
      this.server.to(socketId).emit('notificationSent', savedNotification);
    } else {
      console.log(`⚠️ Usuario ${receiverId} no está conectado`);
    }
  }

  @SubscribeMessage('receivedNotification')
  handleReceivedNotification(
    @ConnectedSocket() client: Socket,
    @MessageBody() notificationId: string,
  ) {
    this.server.emit('notificationReceived', notificationId);
  }
}

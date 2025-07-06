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

@WebSocketGateway()
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly notificationsService: NotificationsService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`🟢 Usuario conectado en notificaciones: ${client.id}`);
    const userId = client.handshake.query.userId as string;
    if (userId) {
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`🔴 Usuario desconectado en notificaciones: ${client.id}`);
  }

  @SubscribeMessage('sendNotification')
  handleSendNotification(
    @ConnectedSocket() client: Socket,
    @MessageBody() notification: CreateNotificationDto,
  ) {
    this.notificationsService.create(notification);
    this.server.emit('notificationSent', notification);
  }

  @SubscribeMessage('receivedNotification')
  handleReceivedNotification(
    @ConnectedSocket() client: Socket,
    @MessageBody() notificationId: string,
  ) {
    this.server.emit('notificationReceived', notificationId);
  }
}

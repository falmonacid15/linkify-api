import { FriendshipStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFriendshipDto {
  @IsUUID()
  @IsNotEmpty()
  requesterId: string;

  @IsUUID()
  @IsNotEmpty()
  receiverId: string;

  @IsEnum(FriendshipStatus)
  @IsNotEmpty()
  status: FriendshipStatus;
}

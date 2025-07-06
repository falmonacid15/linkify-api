import { FriendshipStatus } from '@prisma/client';

export class CreateFriendshipDto {
  requesterId: string;
  receiverId: string;
  status: FriendshipStatus;
}

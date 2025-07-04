export class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  biography?: string;
  nationality?: string;
  avatarUrl?: string;
  coverUrl?: string;
  isActive?: boolean;
  isOnline?: boolean;
  lastSeen?: Date;
  isEmailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRepostDto {
  @IsUUID()
  @IsNotEmpty()
  postId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

import { ReactionType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateReactionDto {
  @IsEnum(ReactionType)
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty()
  type: ReactionType;

  @IsUUID()
  @IsNotEmpty()
  postId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

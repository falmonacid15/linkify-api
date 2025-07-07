import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  postId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  content: string;
}

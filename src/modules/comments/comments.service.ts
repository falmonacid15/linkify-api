import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../Prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateCommentDto) {
    return await this.prisma.comment.create({ data });
  }

  async findAll() {
    return await this.prisma.comment.findMany({
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  async findOne(where: Prisma.CommentWhereUniqueInput) {
    return await this.prisma.comment.findUnique({ where });
  }

  async update(where: Prisma.CommentWhereUniqueInput, data: UpdateCommentDto) {
    return await this.prisma.comment.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.CommentWhereUniqueInput) {
    return await this.prisma.comment.delete({ where });
  }
}

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

  async findAll(
    page?: number,
    perPage?: number,
    where?: Prisma.CommentWhereUniqueInput,
    orderBy?: Prisma.CommentOrderByWithRelationInput,
  ) {
    page = page || 1;
    perPage = perPage || 10;

    const skip = (page - 1) * perPage;
    const take = perPage;

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.comment.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.prisma.comment.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / perPage);
    const hasNextPage = totalPages > page;
    const hasPreviousPage = page > 1;
    const cursor = hasNextPage ? data[data.length - 1].id : null;

    return {
      meta: {
        totalCount,
        itemsPerPage: perPage,
        totalPages,
        currentPage: page,
        hasNextPage,
        hasPreviousPage,
        cursor,
      },
      data,
    };
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

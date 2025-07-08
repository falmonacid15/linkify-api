import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { PrismaService } from '../../Prisma.service';

@Injectable()
export class FriendshipsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateFriendshipDto) {
    return await this.prisma.friendship.create({ data });
  }

  async findAll(
    page?: number,
    perPage?: number,
    where?: Prisma.FriendshipWhereUniqueInput,
    orderBy?: Prisma.FriendshipOrderByWithRelationInput,
  ) {
    page = page || 1;
    perPage = perPage || 10;

    const skip = (page - 1) * perPage;
    const take = perPage;

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.friendship.findMany({
        skip,
        take,
        where,
        orderBy,
      }),
      this.prisma.friendship.count({
        where,
      }),
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

  async findOne(where: Prisma.FriendshipWhereUniqueInput) {
    return await this.prisma.friendship.findUnique({ where });
  }

  async update(
    where: Prisma.FriendshipWhereUniqueInput,
    data: UpdateFriendshipDto,
  ) {
    return await this.prisma.friendship.update({ where, data });
  }

  async remove(where: Prisma.FriendshipWhereUniqueInput) {
    return await this.prisma.friendship.delete({ where });
  }
}

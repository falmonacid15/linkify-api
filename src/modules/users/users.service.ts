import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../Prisma.service';
import { hashPassword } from 'src/utils/password';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    data.password = await hashPassword(data.password);
    return await this.prisma.user.create({
      data,
      include: {
        interests: true,
      },
    });
  }

  async findSearchEngine(searchTerm: string) {
    return await this.prisma.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
            lastName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async findAll(
    page?: number,
    perPage?: number,
    where?: Prisma.UserWhereUniqueInput,
    orderBy?: Prisma.UserOrderByWithRelationInput,
  ) {
    page = page || 1;
    perPage = perPage || 10;

    const skip = (page - 1) * perPage;
    const take = perPage;

    console.log(where);

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip,
        take,
        orderBy,
      }),

      this.prisma.user.count({
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

  async findOne(where: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({
      where,
      include: {
        interests: true,
        friends: true,
        posts: {
          include: {
            author: true,
            comments: true,
            reactions: true,
          },
        },
      },
    });

    return user;
  }

  async update(where: Prisma.UserWhereUniqueInput, data: UpdateUserDto) {
    return await this.prisma.user.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.delete({
      where,
    });
  }
}

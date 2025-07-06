import { Injectable } from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { PrismaService } from '../../Prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class InterestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateInterestDto) {
    return await this.prisma.interest.create({ data });
  }

  async findAll(
    page?: number,
    perPage?: number,
    where?: Prisma.InterestWhereUniqueInput,
    orderBy?: Prisma.InterestOrderByWithRelationInput,
  ) {
    page = page || 1;
    perPage = perPage || 10;

    const skip = (page - 1) * perPage;
    const take = perPage;

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.interest.findMany({ where, skip, take, orderBy }),
      this.prisma.interest.count({ where }),
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

  async findOne(where: Prisma.InterestWhereUniqueInput) {
    return await this.prisma.interest.findUnique({ where });
  }

  async update(
    where: Prisma.InterestWhereUniqueInput,
    data: UpdateInterestDto,
  ) {
    return await this.prisma.interest.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.InterestWhereUniqueInput) {
    return await this.prisma.interest.delete({
      where,
    });
  }
}

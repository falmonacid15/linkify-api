import { Injectable } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../Prisma.service';

@Injectable()
export class ReactionsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateReactionDto) {
    return await this.prisma.reaction.create({ data });
  }

  async findAll() {
    return await this.prisma.reaction.findMany();
  }

  async findOne(where: Prisma.ReactionWhereUniqueInput) {
    return await this.prisma.reaction.findUnique({ where });
  }

  async update(
    where: Prisma.ReactionWhereUniqueInput,
    data: UpdateReactionDto,
  ) {
    return await this.prisma.reaction.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.ReactionWhereUniqueInput) {
    return await this.prisma.reaction.delete({ where });
  }
}

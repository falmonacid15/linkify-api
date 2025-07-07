import { Injectable } from '@nestjs/common';
import { CreateRepostDto } from './dto/create-repost.dto';
import { UpdateRepostDto } from './dto/update-repost.dto';
import { PrismaService } from '../../Prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RepostsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateRepostDto) {
    return await this.prisma.repost.create({ data });
  }

  async findAll() {
    return await this.prisma.repost.findMany();
  }

  async findOne(where: Prisma.RepostWhereUniqueInput) {
    return await this.prisma.repost.findUnique({ where });
  }

  async update(where: Prisma.RepostWhereUniqueInput, data: UpdateRepostDto) {
    return await this.prisma.repost.update({ where, data });
  }

  async remove(where: Prisma.RepostWhereUniqueInput) {
    return await this.prisma.repost.delete({ where });
  }
}

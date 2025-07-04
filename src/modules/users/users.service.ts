import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../Prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    return await this.prisma.user.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({
      where,
      include: {
        interests: true,
      },
    });
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

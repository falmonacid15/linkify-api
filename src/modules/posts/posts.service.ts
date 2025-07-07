import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../Prisma.service';
import { deleteImage, uploadMultipleImages } from 'src/utils/cloudinary';

type Files = {
  images?: Express.Multer.File[];
  videos?: Express.Multer.File[];
};

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreatePostDto, files: Files) {
    const { images, videos } = files;

    if (images) {
      data.imageUrl = await uploadMultipleImages(
        images,
        `users/${data.authorId}/posts/images`,
      );
    }

    return await this.prisma.post.create({
      data,
    });
  }

  async findAll(
    page?: number,
    perPage?: number,
    where?: Prisma.PostWhereUniqueInput,
    orderBy?: Prisma.PostOrderByWithRelationInput,
  ) {
    page = page || 1;
    perPage = perPage || 10;

    const skip = (page - 1) * perPage;
    const take = perPage;

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatarUrl: true,
            },
          },
          comments: {
            include: {
              author: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  avatarUrl: true,
                },
              },
            },
          },
          reactions: {
            include: {
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  avatarUrl: true,
                },
              },
            },
          },
          reposts: {
            include: {
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  avatarUrl: true,
                },
              },
            },
          },
        },
        skip,
        take,
        orderBy,
      }),
      this.prisma.post.count({ where }),
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

  async findOne(where: Prisma.PostWhereUniqueInput) {
    return await this.prisma.post.findUnique({
      where,
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
          },
        },
        reactions: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });
  }

  async update(
    where: Prisma.PostWhereUniqueInput,
    data: UpdatePostDto,
    files: Files,
  ) {
    const { images, videos } = files;
    const post = await this.prisma.post.findUnique({ where });

    if (images) {
      if (post?.imageUrl.length) {
        for (const imageUrl of post.imageUrl) {
          await deleteImage(imageUrl);
        }
      }
      data.imageUrl = await uploadMultipleImages(
        images,
        `users/${data.authorId}/posts/images`,
      );
    }

    return await this.prisma.post.update({ where, data });
  }

  async remove(where: Prisma.PostWhereUniqueInput) {
    return await this.prisma.post.delete({ where });
  }
}

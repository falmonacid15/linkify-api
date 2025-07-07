import { Module } from '@nestjs/common';
import { RepostsService } from './reposts.service';
import { RepostsController } from './reposts.controller';
import { PrismaService } from '../../Prisma.service';

@Module({
  controllers: [RepostsController],
  providers: [RepostsService, PrismaService],
})
export class RepostsModule {}

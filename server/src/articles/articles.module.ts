import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [ArticlesService, PrismaClient],
  controllers: [ArticlesController]
})
export class ArticlesModule {}

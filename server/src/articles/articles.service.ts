import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateArticleDto, UpdateArticleDto } from './dto/articles.dto';

@Injectable()
export class ArticlesService {
    constructor(private prisma: PrismaClient) {}

    async createArticle(dto: CreateArticleDto){
        return this.prisma.article.create({
            data: {
                pictureUrl: dto.pictureUrl,
                title: dto.title,
                content: dto.content,
                source: dto.source
            }
        })
    }

    async updateArticle(articleId: number,dto: UpdateArticleDto){
        const existingArticle = await this.prisma.article.findUnique({
            where: {id: articleId}
        });

        if(!existingArticle) throw new NotFoundException();

        return this.prisma.article.update({
            where: {id: articleId},
            data: {
                pictureUrl: dto.pictureUrl,
                title: dto.title,
                content: dto.content,
                source: dto.source,
            }
        })
    }

    async deleteArticle(articleId: number){
        const existingArticle = await this.prisma.article.findUnique({
            where: {id: articleId}
        });

        if(!existingArticle) throw new NotFoundException();

        return this.prisma.article.delete({
            where: {id: articleId}
        })
    }

    async getAllArticles(){
        return this.prisma.article.findMany({
            select: {
                pictureUrl: true,
                title: true,
                content: true,
                source: true,
                updatedAt: true
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });
    }

    async getArticleById(articleId: number){
        const existingArticle = await this.prisma.article.findUnique({
            where: {id: articleId}
        });

        if(!existingArticle) throw new NotFoundException();

        return existingArticle;
    }

    async getAllArticleCards(){
        return this.prisma.article.findMany({
            select: {
                id: true,
                pictureUrl: true,
                title: true,
                createdAt: true
            },
            orderBy: {updatedAt: 'desc'}
        })
    }
}

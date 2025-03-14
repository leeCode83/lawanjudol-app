import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/articles.dto';

@Controller('articles')
export class ArticlesController {
    constructor(private articlesService: ArticlesService) {}

    @Post()
    async createArticle(@Body() dto: CreateArticleDto){
        return this.articlesService.createArticle(dto);
    }

    @Patch(':id')
    async updateArticle(@Param('id') id: number, @Body() dto: UpdateArticleDto){
        return this.articlesService.updateArticle(Number(id), dto);
    }

    @Delete(':id')
    async deleteArticle(@Param('id') id: number){
        return this.articlesService.deleteArticle(Number(id));
    }

    @Get()
    async getAllArticles(){
        return this.articlesService.getAllArticles();
    }

    @Get('id/:id')
    async getArticleById(@Param('id') id: number){
        return this.articlesService.getArticleById(Number(id));
    }

    @Get('cards')
    async getArticleCards(){
        return this.articlesService.getAllArticleCards();
    }
}

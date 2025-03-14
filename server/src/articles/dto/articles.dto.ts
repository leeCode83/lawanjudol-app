import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateArticleDto {
  @IsUrl()
  pictureUrl?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  source: string;
}

export class UpdateArticleDto {
  @IsOptional()
  @IsUrl()
  pictureUrl?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  source?: string;
}

export class FindArticleByIdDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}

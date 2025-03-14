import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;
}

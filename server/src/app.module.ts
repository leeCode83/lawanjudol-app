import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JudolReportModule } from './judol-report/judol-report.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [JudolReportModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

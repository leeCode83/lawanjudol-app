import { Module } from '@nestjs/common';
import { JudolReportService } from './judol-report.service';
import { JudolReportController } from './judol-report.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [JudolReportService, PrismaClient],
  controllers: [JudolReportController]
})
export class JudolReportModule {}

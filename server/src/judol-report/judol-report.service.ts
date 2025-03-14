import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateReportDto } from './dto/judolReport.dto';

@Injectable()
export class JudolReportService {
    constructor(private prisma: PrismaClient) {}

    async createReport(dto: CreateReportDto, userIp: string){
        const report = await this.prisma.report.findFirst({
            where: { url: dto.url}
        });

        if(report) {
            return this.prisma.report.update({
                where: { id: report.id },
                data: {
                    reportCount: report.reportCount + 1
                }
            })
        }else{
            return this.prisma.report.create({
                data: {
                    url: dto.url,
                    reporterIP: userIp
                }
            })
        }
    }

    async getAllReports() {
        return await this.prisma.report.findMany({
          orderBy: {
            reportedAt: 'desc',
          },
        });
    }

    async deleteReport(reportId: number){
        return await this.prisma.report.delete({
          where: {id: reportId}
        });
    }

    async getBlockedSites() {
        const reports = await this.prisma.report.findMany({
          select: { url: true },
        });
      
        return reports.map(report => report.url);
    }
}

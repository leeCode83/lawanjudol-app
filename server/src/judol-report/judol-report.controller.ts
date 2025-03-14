import { Body, Controller, Delete, Get, Ip, Param, Post } from '@nestjs/common';
import { JudolReportService } from './judol-report.service';
import { CreateReportDto } from './dto/judolReport.dto';

@Controller('judol-report')
export class JudolReportController {
    constructor(private reportService: JudolReportService) {}

    @Post('create')
    async createReport(@Body() dto: CreateReportDto, @Ip() ip: string){
        return this.reportService.createReport(dto, ip);
    }

    @Get()
    async getAllReports() {
        return this.reportService.getAllReports();
    }

    @Delete('delete/:id')
    async deleteReport(@Param('id') id: number){
        return this.reportService.deleteReport(Number(id));
    }

    @Get('list')
    async getBlockedSites() {
        return this.reportService.getBlockedSites();
    }
}

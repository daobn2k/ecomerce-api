import { Controller, Get } from '@nestjs/common';
import { GeneralReportService } from './general-report.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('general-report')
@Controller('general-report')
export class GeneralReportController {
  constructor(private readonly generalReportService: GeneralReportService) {}

  @Get('/get-order-report')
  getOrderReport() {
    return this.generalReportService.getOrderReport();
  }
  @Get('/get-product-report')
  getProductReport() {
    return this.generalReportService.getProductReport();
  }
  @Get('/get-user-report')
  getUserReport() {
    return this.generalReportService.getUserReport();
  }
}

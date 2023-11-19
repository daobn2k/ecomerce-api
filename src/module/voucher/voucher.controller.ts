import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto, QueryListVoucher } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('voucher')
@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  create(@Body() CreateVoucherDto: CreateVoucherDto) {
    return this.voucherService.create(CreateVoucherDto);
  }

  @Get()
  findAll(@Query() query: QueryListVoucher) {
    return this.voucherService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateVoucherDto: UpdateVoucherDto) {
    return this.voucherService.update(id, UpdateVoucherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherService.remove(id);
  }

  @Post('/code')
  findByCode(@Body() code: string) {
    return this.voucherService.findByCode(code);
  }
}

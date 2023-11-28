import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { ENumSort } from 'src/constants/interface.constants';

export class CreateVoucherDto {
  @ApiProperty({ type: String, default: '', required: true })
  name: string;
  @ApiProperty({ type: String, default: '' })
  code: string;
  @ApiProperty({ type: Number, default: 0 })
  discount: number;
  @ApiProperty({ type: Date })
  active_date: Date;
  @ApiProperty({ required: true })
  recive_uid: ObjectId;
  @ApiProperty({ required: true })
  create_uid: ObjectId;
  @ApiProperty({ type: Boolean })
  status: boolean;
}

export class QueryListVoucher {
  @ApiProperty({ required: false })
  page: number;

  @ApiProperty({ required: false })
  limit: number;

  @ApiProperty({ required: false, type: String })
  keyword: string;

  @ApiProperty({ required: false, type: String, default: '' })
  create_date: string;

  @ApiProperty({ required: false, type: String })
  start_created_date: string;

  @ApiProperty({ required: false, type: String })
  end_created_date: string;

  @ApiProperty({ required: false, type: String, default: 'created_at' })
  sort_by: string;
  @ApiProperty({ required: false, enum: ENumSort, default: ENumSort.DESC })
  order_by: ENumSort;
}

import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { ProductDocument } from 'src/module/products/schema/product.schema';
import { StatusOrder } from '../schema/order.schema';
import { ENumSort } from 'src/constants/interface.constants';

export class CreateOrderDto {
  @ApiProperty({ required: false, default: '', type: String })
  code: string;
  @ApiProperty({ required: true, default: [], type: Array })
  items: ProductDocument[];
  @ApiProperty({ default: 0, type: Number, required: true })
  total_quantity: number;
  @ApiProperty({ default: 0, type: Number, required: true })
  total_price: number;
  @ApiProperty({ required: true, default: '', type: String })
  shipping_address: string;
  @ApiProperty({ required: true, default: StatusOrder.PENDING, type: String })
  status: string;
  @ApiProperty({ required: false, default: '', type: String })
  voucher_code: string;
  @ApiProperty({ required: true })
  create_uid: ObjectId;
}

export class actionDto {
  @ApiProperty({ required: true, type: String })
  order_id: ObjectId;
}

export class QueryListOrder {
  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  limit?: number;

  @ApiProperty({ required: false, type: String })
  keyword?: string;

  @ApiProperty({ required: false, type: String, default: '' })
  create_date?: string;

  @ApiProperty({ required: false, type: String, default: 'created_at' })
  sort_by?: string;
  @ApiProperty({ required: false, enum: ENumSort, default: ENumSort.DESC })
  order_by?: ENumSort;
  @ApiProperty({ required: false, type: String })
  created_uid?: ObjectId;
  @ApiProperty({ required: false, enum: StatusOrder })
  status?: StatusOrder;

  @ApiProperty({ required: false, type: String })
  start_created_date?: string;
  @ApiProperty({ required: false, type: String })
  end_created_date?: string;
}

export class QueryListProductOrdered {
  @ApiProperty({ required: true, type: String })
  create_uid: ObjectId;
}

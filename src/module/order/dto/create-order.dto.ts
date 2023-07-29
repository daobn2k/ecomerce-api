import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { ProductDocument } from 'src/module/products/schema/product.schema';
import { StatusOrder } from '../schema/order.schema';

export class CreateOrderDto {
  @ApiProperty({ required: true, default: [], type: Array })
  items: ProductDocument[];
  @ApiProperty({ required: true, default: 0, type: Number })
  total_quantity: number;
  @ApiProperty({ required: true, default: 0, type: Number })
  total_price: number;
  @ApiProperty({ required: true, default: '', type: String })
  shipping_address: string;
  @ApiProperty({ required: true, default: StatusOrder.Pending, type: String })
  status: string;
  @ApiProperty({ required: false, default: '', type: String })
  voucher_code: string;
  @ApiProperty({ required: true })
  create_uid: ObjectId;
}

export class QueryListOrder {
  @ApiProperty({ required: false })
  page: number;

  @ApiProperty({ required: false })
  limit: number;

  @ApiProperty({ required: false, type: String })
  keyword: string;

  @ApiProperty({ required: false, type: String, default: '' })
  create_date: string;
}

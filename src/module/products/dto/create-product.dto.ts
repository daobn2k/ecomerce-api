import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { EStatus, TProductSize } from '../products.constant';

export class CreateProductDto {
  @ApiProperty({ required: true, type: String, maxLength: 256 })
  name: string;
  @ApiProperty({ required: true, type: String, maxLength: 256 })
  description: string;
  @ApiProperty({ required: true, type: String })
  price: string;
  @ApiProperty({ required: false, type: String })
  price_amount: string;
  @ApiProperty({ required: true })
  create_uid: ObjectId;
  @ApiProperty({ required: true, maxLength: 256 })
  origin: string;
  @ApiProperty({ required: true, default: 0, type: Number })
  quantity: number;
  @ApiProperty({ required: true })
  coverImage: string;
  @ApiProperty({ required: true, maxItems: 10 })
  images: Array<string>;
  @ApiProperty({
    required: true,
    default: EStatus.DEACTIVATE,
    type: String,
    enum: EStatus,
  })
  status: EStatus;
  @ApiProperty({ required: false })
  create_date: Date;
  @ApiProperty({
    required: true,
    maxLength: 10,
    type: String,
  })
  @ApiProperty({ required: true, default: [], type: Array })
  size: TProductSize[];
}

export class QueryListProducts {
  @ApiProperty({ required: false })
  page: number;

  @ApiProperty({ required: false })
  limit: number;

  @ApiProperty({ required: false, type: String })
  keyword: string;

  @ApiProperty({ required: false, type: String, default: '' })
  create_date: string;

  @ApiProperty({ required: false, type: String, default: '' })
  status: string;
}

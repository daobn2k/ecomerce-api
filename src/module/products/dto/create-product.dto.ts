import { ApiProperty } from '@nestjs/swagger';
import mongoose, { ObjectId } from 'mongoose';

export class CreateProductDto {
  @ApiProperty({ required: true, type: String, maxLength: 256 })
  name: string;
  @ApiProperty({ required: true, type: Number })
  price: number;
  @ApiProperty({ required: true, type: Number })
  size: number;
  @ApiProperty({ required: true, type: String, maxLength: 10 })
  color: string;
  @ApiProperty({ required: true })
  create_uid: ObjectId;
  @ApiProperty({ required: true })
  origin: string;
  @ApiProperty({ required: true, default: 0 })
  quantity: number;
  @ApiProperty({ required: true })
  coverImage: string;
  @ApiProperty({ required: true })
  images: Array<string>;

  @ApiProperty({ required: true, default: '1', type: String })
  status: string;

  @ApiProperty({ required: false })
  create_date: Date;
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
}

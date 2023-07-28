import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateCategoryDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  create_uid: ObjectId;
}

export class QueryListCategories {
  @ApiProperty({ required: false })
  page: number;

  @ApiProperty({ required: false })
  perPage: number;

  @ApiProperty({ required: false, type: String })
  keyword: string;

  @ApiProperty({ required: false, type: String, default: '' })
  create_date: string;
}

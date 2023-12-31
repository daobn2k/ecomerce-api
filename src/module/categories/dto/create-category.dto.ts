import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateCategoryDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty({ required: false })
  create_uid: ObjectId;
}

export class QueryListCategories {
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
}

import { ApiProperty } from '@nestjs/swagger';

export class CreateSettingDto {
  @ApiProperty({ required: true, type: String, maxLength: 256, default: '' })
  type: string;
  @ApiProperty({ required: true, default: '' })
  value: any;
  @ApiProperty({ default: '' })
  description: '';
}

import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class NotificationDto {
  @ApiProperty({ type: String, default: '', required: true })
  title: string;
  @ApiProperty({ type: String, default: '', required: true })
  message: string;
  @ApiProperty({ type: String, default: '', required: true })
  token: string;
  @ApiProperty({ type: Boolean, default: false })
  is_read: boolean;
  @ApiProperty({ type: String, default: '', required: false })
  send_id: ObjectId;
  @ApiProperty({ type: String, default: '' })
  receive_id: ObjectId;
  @ApiProperty({ default: '' })
  dataBody: any;
}

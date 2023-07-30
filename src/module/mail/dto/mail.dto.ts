import { ApiProperty } from '@nestjs/swagger';

export class MailDto {
  @ApiProperty({ required: true, type: String })
  to: string;
  @ApiProperty({ default: '', type: String, required: true })
  subject: string;
  @ApiProperty({ default: '', type: String })
  content: string;
}

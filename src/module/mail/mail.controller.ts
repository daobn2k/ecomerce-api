import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailDto } from './dto/mail.dto';
import { MailService } from './mail.service';
@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  @Post()
  create(@Body() data: MailDto) {
    return this.mailService.sendEmail(data);
  }
}

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailDto } from './dto/mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(data: MailDto): Promise<string> {
    const { to, subject, content } = data;

    const res = await this.mailerService.sendMail({
      to,
      subject,
      text: content,
    });
    return 'This Send Success';
  }
}

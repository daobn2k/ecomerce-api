import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // Your SMTP server address
        port: 587, // SMTP port (587 is the default for most providers)
        secure: false, // Set to true if you are using SSL/TLS
        auth: {
          user: 'vvdao096@gmail.com', // Your email address
          pass: 'zdqambezhszffpww',
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}

import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { Voucher } from './entities/voucher.entity';
import { VoucherSchema } from './schema/voucher.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { UserSchema } from '../users/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Voucher.name, schema: VoucherSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [VoucherController],
  providers: [VoucherService, MailService, UsersService],
})
export class VoucherModule {}

import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { OrderSchema } from './schema/order.schema';
import { Voucher } from '../voucher/entities/voucher.entity';
import { VoucherSchema } from '../voucher/schema/voucher.schema';
import { Product } from '../products/entities/product.entity';
import { ProductSchema } from '../products/schema/product.schema';
import { MailService } from '../mail/mail.service';
import { UserSchema } from '../users/schema/user.schema';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Voucher.name, schema: VoucherSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, MailService, UsersService],
})
export class OrderModule {}

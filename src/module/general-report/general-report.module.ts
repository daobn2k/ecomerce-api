import { Module } from '@nestjs/common';
import { GeneralReportService } from './general-report.service';
import { GeneralReportController } from './general-report.controller';
import { OrderService } from '../order/order.service';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from '../order/entities/order.entity';
import { OrderSchema } from '../order/schema/order.schema';
import { Product } from '../products/entities/product.entity';
import { ProductSchema } from '../products/schema/product.schema';
import { User } from '../users/entities/user.entity';
import { UserSchema } from '../users/schema/user.schema';
import { Voucher } from '../voucher/entities/voucher.entity';
import { VoucherSchema } from '../voucher/schema/voucher.schema';
import { MailService } from '../mail/mail.service';
import { Category } from '../categories/entities/category.entity';
import { CategorySchema } from '../categories/schema/category.schema';
import { CategoriesService } from '../categories/categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Voucher.name, schema: VoucherSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [GeneralReportController],
  providers: [
    GeneralReportService,
    OrderService,
    UsersService,
    ProductsService,
    MailService,
    CategoriesService,
  ],
})
export class GeneralReportModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './module/categories/categories.module';
import { MailModule } from './module/mail/mail.module';
import { OrderModule } from './module/order/order.module';
import { ProductsModule } from './module/products/products.module';
import { UploadfileModule } from './module/uploadfile/uploadfile.module';
import { UsersModule } from './module/users/users.module';
import { VoucherModule } from './module/voucher/voucher.module';
import { SettingModule } from './module/setting/setting.module';
import { NotificationModule } from './module/notification/notification.module';
import { OrderService } from './module/order/order.service';
import { GeneralReportModule } from './module/general-report/general-report.module';

const url = 'mongodb://localhost:27017/ecommerce';
@Module({
  imports: [
    MongooseModule.forRoot(url),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    UploadfileModule,
    MulterModule.register({ dest: './uploads' }),
    OrderModule,
    VoucherModule,
    MailModule,
    SettingModule,
    NotificationModule,
    GeneralReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

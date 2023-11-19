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

const url = 'mongodb://dao:1234@localhost:27017/ecommerce?authSource=admin';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

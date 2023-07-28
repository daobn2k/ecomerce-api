import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './module/categories/categories.module';
import { ProductsModule } from './module/products/products.module';
import { UploadfileModule } from './module/uploadfile/uploadfile.module';
import { UsersModule } from './module/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/ecommerce'),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    UploadfileModule,
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { ProductsModule } from '../products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Setting } from './entities/setting.entity';
import { SettingSchema } from './schema/setting.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }]),
    ProductsModule,
  ],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}

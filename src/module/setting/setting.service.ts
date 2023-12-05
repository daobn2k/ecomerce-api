import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(Setting.name) private settingModel: Model<Setting>,
  ) {}

  async create(data: CreateSettingDto) {
    const result = await this.settingModel.create(data);

    return {
      data: result,
      result: 'SUCCESS',
      message: 'Thiế lập thành công',
    };
  }

  async findAll() {
    const result = await this.settingModel.find().exec();

    return {
      data: result,
      result: 'SUCCESS',
      message: 'Thiế lập thành công',
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  async update(id: string, updateSettingDto: UpdateSettingDto) {
    const result = await this.settingModel.findByIdAndUpdate(
      id,
      updateSettingDto,
      {
        new: true,
      },
    );
    return {
      result: 'SUCCESS',
      message: 'Chỉnh sửa người dùng thành công',
      data: result,
    };
  }

  async remove(id: string) {
    const res = await this.settingModel.findByIdAndDelete(id, { new: true });
    return {
      data: res,
      result: 'SUCCESS',
      message: 'Xóa người dùng thành công',
    };
  }
}

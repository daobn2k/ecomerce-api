import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { NotificationDto } from './dto/notification.dto';
import { log } from 'handlebars';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './entities/notification.entity';
import { Model } from 'mongoose';
@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}

  async sendNotification(data: NotificationDto) {
    const { title, token, message, dataBody, send_id, receive_id } = data;
    const payload = [
      {
        notification: { title, body: message },
        token: token,
      },
    ];

    const response = await admin.messaging().sendEach(payload);
    if (response) {
      // to do save to server
      const result = await this.notificationModel.create({
        title: title,
        message: message,
        dataBody: dataBody,
        send_id,
        receive_id,
        is_read: false,
      });
      return result;
    }
  }

  async getNotification() {
    return [];
  }
  async readNotification() {
    return '';
  }
  async readAllNotification() {
    return '';
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUploadfileDto } from './dto/create-uploadfile.dto';

@Injectable()
export class UploadfileService {
  uploadFile(createUploadfileDto: CreateUploadfileDto) {
    return 'This action adds a new uploadfile';
  }
}

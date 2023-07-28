import { Module } from '@nestjs/common';
import { UploadfileService } from './uploadfile.service';
import { UploadfileController } from './uploadfile.controller';

@Module({
  controllers: [UploadfileController],
  providers: [UploadfileService]
})
export class UploadfileModule {}

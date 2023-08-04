import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('uploadfile')
@Controller('uploadfile')
export class UploadfileController {
  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (red, file, callback) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);

          const ext = extname(file.originalname);

          const filename = `${file.originalname}-${unique}${ext}`;

          callback(null, filename);
        },
      }),
    }),
  )
  uploadfile(@UploadedFile() file: Express.Multer.File) {
    const url = `http://localhost:8080/${file.filename}`;
    return { url };
  }

  @Post('/multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './files', // Thư mục lưu trữ các files đã upload
        filename: (req, file, callback) => {
          // Tạo tên file mới dựa trên thời gian và phần mở rộng của file gốc
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
          );
        },
      }),
    }),
  )
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files, 'files');

    const urls = files.map((file) => {
      return `http://localhost:8080/${file.filename}`;
    });
    return { message: 'Files uploaded successfully', data: urls };
  }
}

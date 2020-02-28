import {
  Controller,
  Post, UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Get,
  Param,
  Res,
  Req,
  HttpException
} from '@nestjs/common'
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'
import * as FileType from 'file-type'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    limits: {
      fileSize: 30 * 1024 * 1024
    }
  }))
  async uploadFile(@UploadedFile() file, @Req() req) {
    try {
      const { type } = req.query
      const fileType = await FileType.fromBuffer(file.buffer) || false
      if (file.originalname.split('').indexOf('/') !== -1) {
        throw new HttpException('Stop hacking this !', 400)
      } else {
        if (fileType && fileType.ext === 'png') {
          return this.fileService.uploadToDrive(file, type)
        }

        throw new HttpException('Unsupported Media Type ', 415)
      }
    } catch (error) {
      console.log(error)
    }

  }

  @Get('download')
  async downloadFile(@Req() req, @Res() res) {
    const { id, type } = req.query
    if (id.split('').indexOf('/') !== -1) {
      throw new HttpException('Stop hacking this !', 400)
    }
    return this.fileService.sendFile(id, res, type)
  }
}

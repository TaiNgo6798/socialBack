import { Injectable } from '@nestjs/common'
import { createWriteStream } from 'fs'
import { uuid } from 'uuidv4'

@Injectable()
export class FileService {
  async saveFile(file, type) {
    const id = uuid()
    const path = `src/images/${type}/${id}`
    await new Promise<any>((resolve) => {
      const fileStream = createWriteStream(path)
      fileStream.write(file.buffer)
      fileStream.end()
      fileStream.on('finish', resolve)
    })
    return {
      id,
      originalname: file.originalname,
      size: file.size
    }
  }

  async sendFile(id, res, type) {
    try {
       res.download(`src/images/${type}/${id}`)
    } catch (error) {
      return 'Khong tim thay anh !'
    }

  }
}

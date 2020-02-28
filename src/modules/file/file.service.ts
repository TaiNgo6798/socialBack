import { Injectable } from '@nestjs/common'
import { createWriteStream } from 'fs'
import { uuid } from 'uuidv4'
import { drive_v3, google } from 'googleapis'
import * as fs from 'fs'
import * as stream  from 'stream'


@Injectable()
export class FileService {

  async getToken(oauth2Client){
    const folderID = '1Gp-5q3PX1UCpNzh3nT0sr32ctWKj5qJ0'
    const scopes = [
      'https://www.googleapis.com/auth/drive',
    ];
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
      // If you only need one scope you can pass it as a string
      scope: scopes
    });

     return url

    const code = '4/wwHJeY_o9HeW3alK7f9A6a1mbPrhd7VxRjZ5-IObvQOwoaHyP-ahaBgeTL6-lx3_0-Db3ELaCSAPT7RVfY_ywmI'
    const {tokens} = await oauth2Client.getToken(code)

  }

  async uploadToDrive(file, type) {
    try {
      const oauth2Client = new google.auth.OAuth2(
        '110918262587-st7ko9m685ot30ja91jbvo21npfmbb6h.apps.googleusercontent.com',
        'VDdWeTlSp2_TBpfV6VUiYevI',
        'https://social-web-ee96e.firebaseapp.com/__/auth/handler'
      )
      
      const tokens = {
        "access_token": "ya29.Il-_B8OvC0SvhPaBVuLMXtKBI4pFztUOEeu2ymZHcRQ1rWIM4ZVwk6fda54Mm6aVPVRbXx4GiZT64nhub-9BgmV9ASh2yUZyzQpNcaxQ9saH0ln2Scev8D900ako0sbPMg",
        "refresh_token": "1//0grLlIjJ06Z8-CgYIARAAGBASNwF-L9IrNGOtfXRlOSTIM82AdR93yPB2SGg2Z_FqtOBT8BzfySn3c36_nXoHV5UI1-Vwp4zOnU8",
        "scope": "https://www.googleapis.com/auth/drive",
        "token_type": "Bearer",
        "expiry_date": 1582624434532
      }
      oauth2Client.setCredentials(tokens)
  
      const drive = google.drive({
        version: 'v3',
        auth: oauth2Client
      })
  
      const toPostFolder = '1SxdM2EEhvf2BDiKRYGyMnFvOomFZPTvG'
      const toUserFolder = '17-oZZs4TlHUki92TI51e9tlYbwg4eUC1'
  
      let bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);
  
      const res = await drive.files.create({
        requestBody: {
          name: `${file.name}.png`,
          mimeType: 'image/png',
          parents: [
            type === 'post' ? toPostFolder : toUserFolder
          ],
        },
        media: {
          mimeType: 'image/png',
          body: bufferStream
        },
        fields: 'thumbnailLink, webContentLink'
    })
      return res.data.webContentLink
    } catch (error) {
      return 'cant upload !'
    }
   
  }

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

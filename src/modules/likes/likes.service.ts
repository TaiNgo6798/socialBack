import { Injectable } from '@nestjs/common';
import { getMongoManager } from 'typeorm';
import { LikeEntity } from 'src/entities/likes.entity';


@Injectable()
export class LikesService {
  async deleteLikesOnePost(id: string): Promise<Boolean> {
    try {

      const res = await getMongoManager().deleteMany(LikeEntity, {
        _postID: id
      })
      console.log('del likes !') 
      return true
    } catch (error) {
      return false
    }
  }
}

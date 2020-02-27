import { Injectable } from '@nestjs/common';
import { getMongoManager } from 'typeorm';
import { LikeEntity } from 'src/entities/likes.entity';

@Injectable()
export class LikeService {
  async deleteLikeOnePost(postID): Promise<Boolean> {
    try {
      const res = await getMongoManager().deleteMany(LikeEntity, {
        postID
      })
      return true
    } catch (error) {
      return false
    }

  }
}

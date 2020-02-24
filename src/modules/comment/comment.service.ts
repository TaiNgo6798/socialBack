import { Injectable } from '@nestjs/common';
import { CommentEntity } from 'src/entities/comments.entity';
import { getMongoManager } from 'typeorm';

@Injectable()
export class CommentService {
  async deleteCommentOnePost(id: string): Promise<Boolean> {
    try {

      const res = await getMongoManager().deleteMany(CommentEntity, { 
        postID: id
      })
      console.log('del comment !')

      return true
    } catch (error) {
      return false
    }

  }
}

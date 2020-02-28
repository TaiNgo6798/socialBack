import { Module } from '@nestjs/common'
import { PostResolver } from './post.resolver'
import { UserModule } from '../user/user.module'
import { CommentModule } from '../comment/comment.module'
import { FileModule } from 'src/modules/file/file.module'
import { LikeModule } from '../like/like.module'

@Module({
  imports: [UserModule, CommentModule, FileModule, LikeModule],
  providers: [PostResolver]
})
export class PostModule {}

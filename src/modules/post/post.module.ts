import { Module } from '@nestjs/common'
import { PostResolver } from './post.resolver'
import { UserModule } from '../user/user.module'
import { LikesModule } from '../likes/likes.module'
import { CommentModule } from '../comment/comment.module'

@Module({
  imports: [UserModule, LikesModule, CommentModule],
  providers: [PostResolver]
})
export class PostModule {}

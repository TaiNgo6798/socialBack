import { Module } from '@nestjs/common'
import { PostResolver } from './post.resolver'
import { UserModule } from '../user/user.module'
import { CommentModule } from '../comment/comment.module'
import { FileModule } from 'src/file/file.module'

@Module({
  imports: [UserModule, CommentModule, FileModule],
  providers: [PostResolver]
})
export class PostModule {}

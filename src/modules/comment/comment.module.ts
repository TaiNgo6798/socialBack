import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [CommentResolver, CommentService],
  exports: [CommentResolver, CommentService]
})
export class CommentModule {}

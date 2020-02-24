import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';

@Module({
  providers: [CommentResolver, CommentService],
  exports: [CommentResolver, CommentService]
})
export class CommentModule {}

import { Module } from '@nestjs/common';
import { LikesResolver } from './likes.resolver';
import { LikesService } from './likes.service';

@Module({
  providers: [LikesResolver, LikesService],
  exports: [LikesResolver, LikesService]
})
export class LikesModule {}

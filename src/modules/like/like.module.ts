import { Module } from '@nestjs/common';
import { LikeResolver } from './like.resolver';
import { UserModule } from '../user/user.module';
import { LikeService } from './like.service';

@Module({
  imports: [UserModule],
  providers: [LikeResolver, LikeService],
  exports: [LikeResolver, LikeService]
})
export class LikeModule {}

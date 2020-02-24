import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { getMongoManager } from 'typeorm';
import { LikeEntity } from 'src/entities/likes.entity';
import { UseGuards } from '@nestjs/common';

@Resolver('Likes')
@UseGuards(UseGuards)
export class LikesResolver {

  //---------------------------------------------------QUERIES------------------------------------------------------------------


  //---------------------------------------------------MUTATIONS------------------------------------------------------------------

  @Mutation()
  async likeOnePost(@Context() context,  @Args('_postID') _postID): Promise<Boolean>{
    try {
      const currentPost = await getMongoManager().findOne(LikeEntity, _postID)
      const { likeList } = currentPost
      const res = getMongoManager()
      return true
    } catch (error) {
      return false
    }

  }

}

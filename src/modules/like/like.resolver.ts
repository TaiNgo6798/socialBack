import { Resolver, Query, Args, ResolveProperty, Parent, Mutation, Subscription, Context } from '@nestjs/graphql'
import {Like} from '../../graphql.schema'
import { getMongoManager } from 'typeorm'
import { LikeEntity } from 'src/entities/likes.entity'
import { UserResolver } from '../user/user.resolver'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/common/guard/auth.guard'

@Resolver('Like')
@UseGuards(GqlAuthGuard)
export class LikeResolver {
  constructor(
    private readonly userResolver: UserResolver
  ){}

  @Query()
  async getLikesByPostID(@Args('postID') postID): Promise<Like[]>{
      const res = await getMongoManager().find(LikeEntity, {
        postID: postID.toString()
      })
      return res
  }

  @ResolveProperty('who')
  async getUser(@Parent() like) {
    const { idWho } = like
    const res = await this.userResolver.getUserByID(idWho)
    return res
  }

  @Mutation()
  async doLike(@Context() context, @Args('likeInput') likeInput): Promise<Boolean> {
    try {
      const { _id: idWho } = context.user
      const { postID } = likeInput
      const currentLikes = await getMongoManager().find(LikeEntity, {
        postID,
        idWho
      })
      if(currentLikes.length === 0) {
        const newLike = new LikeEntity({
          postID,
          idWho
        })
        const savedRes = await getMongoManager().save(LikeEntity, newLike)
      } else {
        const res = await getMongoManager().findOneAndDelete(LikeEntity, {
          postID,
          idWho
        })
      }
      return true
    } catch (error) {
      console.log(error)
      return false
    }

  }

}

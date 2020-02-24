import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guard/auth.guard';
import { getMongoManager } from 'typeorm';
import { CommentEntity } from 'src/entities/comments.entity';
import { UserResolver } from '../user/user.resolver';
import { CommentOutput } from '../../graphql.schema'
import { ObjectID } from 'mongodb'

@Resolver('Comment')
@UseGuards(GqlAuthGuard)
export class CommentResolver {
  constructor(
    private readonly userResolver: UserResolver
  ) { }
  //-----------------------------------------------------------------------------------QUERIES------------------------------------------------------------------------------------------------------------------------

  @Query()
  async getCommentsByPostID(@Args('postID') postID): Promise<CommentOutput[]> {
    try {
      const comments = await getMongoManager().find(CommentEntity, {
        postID
      })
      const userList = await Promise.all(
        comments.map(v => {
          return this.userResolver.getUserByID(v.who)
        }))

        let result = []
        userList.map((v,k) => {
          const { _id, postID, text, time } = comments[k]
          let comment = {
            _id,
            who: v,
            postID,
            text,
            time
          }
          result.unshift(comment)
        })

      return result
    } catch (error) {
      console.log(error)
      return null
    }

  }

  //-----------------------------------------------------------------------------------MUTATIONS------------------------------------------------------------------------------------------------------------------------

  @Mutation()
  async editOneComment(@Args('editInput') editInput): Promise<Boolean>{
    try {
      const { _id, text } = editInput
      const result = await getMongoManager().findOneAndUpdate(CommentEntity,{
        _id: new ObjectID(_id)
      },
      {
        $set:{
          text
        }
      }
      )
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  @Mutation()
  async postOneComment(@Context() context, @Args('commentInput') commentInput): Promise<Boolean> {
    try {
      const { postID, text } = commentInput
      const { user } = context
      const newComment = new CommentEntity({
        who: user._id,
        postID,
        text,
        time: Date.now()
      })
      const savedResult = await getMongoManager().save(CommentEntity, newComment)
      return true
    } catch (error) {
      return false
    }
  }

}

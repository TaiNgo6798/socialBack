import { Resolver, Query, Args, Mutation, Context, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guard/auth.guard';
import { getMongoManager } from 'typeorm';
import { CommentEntity } from 'src/entities/comments.entity';
import { UserResolver } from '../user/user.resolver';
import { ObjectID } from 'mongodb'
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

@Resolver('Comment')

export class CommentResolver {
  constructor(
    private readonly userResolver: UserResolver
  ) { }

  //-----------------------------------------------------------------------------------QUERIES------------------------------------------------------------------------------------------------------------------------
  @UseGuards(GqlAuthGuard)
  @Query()
  async getCommentsByPostID(@Args('postID') postID): Promise<CommentEntity[]> {
    try {
      const comments = await getMongoManager().find(CommentEntity, {
        postID
      })
      return comments
    }
    catch (error) {
      console.log(error)
      return null
    }

  }

  @ResolveProperty('who')
  async getUserByID(@Parent() c) {
    const { userID: id } = c
    const result = await this.userResolver.getUserByID(id)
    return result
  }

  @UseGuards(GqlAuthGuard)
  @Query()
  async countCommentByPostID(@Args('postID') _id) {
    const result = await getMongoManager().count(CommentEntity, {
      postID: _id.toString()
    })
    return result
  }

  //-----------------------------------------------------------------------------------MUTATIONS------------------------------------------------------------------------------------------------------------------------
  @UseGuards(GqlAuthGuard)
  @Mutation()
  async editOneComment(@Args('editInput') editInput): Promise<Boolean> {
    try {
      const { _id, text } = editInput
      const result = await getMongoManager().findOneAndUpdate(CommentEntity, {
        _id: new ObjectID(_id)
      },
        {
          $set: {
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

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async postOneComment(@Context() context, @Args('commentInput') commentInput): Promise<Boolean> {
    try {
      const { postID, text } = commentInput
      const { user } = context
      const newComment = new CommentEntity({
        userID: user._id,
        postID,
        text,
        time: Date.now()
      })
      const savedResult = await getMongoManager().save(CommentEntity, newComment)

      //tra ve cho subscription
      pubsub.publish('commentCreated', {
        commentCreated: newComment
      })
      return true
    } catch (error) {
      return false
    }
  }

  //-----------------------------------------------------SUBSCRIPTIONS-------------------------------------------------------------------------
  @Subscription('commentCreated', {
    filter: (payload, variables, context) => {
      // payload: du lieu tra ve cho subscription
      // variables: cac bien truyen vao tu Graphql Subscription (post.graphql)
      // context truyen tu ham onConnect ben module
      const { postID } = variables
      const { commentCreated } = payload
      if (commentCreated.postID === postID)
        return true
      return false
    }
  })
  commentCreated() {
    return pubsub.asyncIterator('commentCreated')
  }

}

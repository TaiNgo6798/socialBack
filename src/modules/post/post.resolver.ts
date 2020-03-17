import {
  Resolver,
  Query,
  Context,
  Mutation,
  Args,
  Subscription,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql'
import { UseGuards, HttpException } from '@nestjs/common'
import { GqlAuthGuard } from '../../common/guard/auth.guard'
import { getMongoManager } from 'typeorm'
import { PostEntity } from '../../entities/post.entity'
import { ObjectID } from 'mongodb'
import { CommentService } from '../comment/comment.service'
import { UserResolver } from '../user/user.resolver'
import { Post } from 'src/graphql.schema'
import { LikeResolver } from '../like/like.resolver'
import { LikeService } from '../like/like.service'
import { FileService } from '../file/file.service'
import { CommentResolver } from '../comment/comment.resolver'



@Resolver('Post')

export class PostResolver {

  constructor(
    private readonly commentService: CommentService,
    private readonly commentResolver: CommentResolver,
    private readonly userResolver: UserResolver,
    private readonly likeResolver: LikeResolver,
    private readonly likeService: LikeService,
    private readonly fileService: FileService
  ) { }


  //-----------------------------------------------------------------------------------QUERIES------------------------------------------------------------------------------------------------------------------------
  @UseGuards(GqlAuthGuard)
  @Query()
  async posts(@Context() context, @Args('skip') skip): Promise<Post[]> {
    const limit = 10
    const postList = await getMongoManager().find(PostEntity, {
      skip,
      take: limit,
      order: {
        time: -1
      }
    })
    return postList
  }

  @ResolveProperty('who')
  async getUserByID(@Parent() p) {
    const { idWho: id } = p
    const result = await this.userResolver.getUserByID(id)
    return result
  }

  @ResolveProperty('likes')
  async getLikes(@Parent() post) {
    const { _id: id } = post
    const result = this.likeResolver.getLikesByPostID(id)
    return result 
  }

  @ResolveProperty('commentsCount')
  async countCmt(@Parent() post) {
    const {_id: postID} = post
    const result = await this.commentResolver.countCommentByPostID(postID)
    return result
  }

  @UseGuards(GqlAuthGuard)
  @Query()
  async getOnePost(@Context() Context, @Args('_id') _id): Promise<Post> {
    try {
      const savedResult = await getMongoManager().findOne(PostEntity, {
        _id: new ObjectID(_id)
      })
      return savedResult
    } catch (error) {
      console.log(error)
      return null
    }
  }


  //-----------------------------------------------------------------------------------MUTATIONS------------------------------------------------------------------------------------------------------------------------

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async addPost(@Context() Context, @Args('post') post): Promise<Post> {
    try {
      const user = await this.userResolver.getUserByID(Context.user._id)
      const { content, image } = post
      const newPost = new PostEntity({
        idWho: user._id,
        image,
        content,
        time: Date.now()
      })
      const savedResult = await getMongoManager().save(PostEntity, newPost)
      return savedResult
    } catch (error) {
      return null
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async deletePost(@Context() Context, @Args('deleteInput') deleteInput): Promise<Boolean> {
    try {
      const { postID, imageID } = deleteInput
      const res = await Promise.all([
        this.likeService.deleteLikeOnePost(postID),
        this.commentService.deleteCommentOnePost(postID),
        this.fileService.deleteFile(imageID ),
        getMongoManager().findOneAndDelete(PostEntity, {
          _id: new ObjectID(postID)
        })
      ])
      return (res[3].value) ? true : false
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async updatePost(@Args('post') post): Promise<Boolean> {
    try {
      const { _id, content } = post
      const res = await getMongoManager().findOneAndUpdate(PostEntity, {
        _id: new ObjectID(_id)
      },
        {
          $set: {
            content,
            time: Date.now()
          }
        })
      return res.value ? true : false
    } catch (error) {
      return false
    }
  }

}

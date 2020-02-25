import {
  Resolver,
  Query,
  Context,
  Mutation,
  Args,
} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../../common/guard/auth.guard'
import { getMongoManager } from 'typeorm'
import { PostEntity } from '../../entities/post.entity'
import { Post } from '../../graphql.schema'
import { ObjectID } from 'mongodb'
import { CommentService } from '../comment/comment.service'

@Resolver('Post')
@UseGuards(GqlAuthGuard)
export class PostResolver {

  constructor(
    private readonly commentService: CommentService
    ){}

  //-----------------------------------------------------------------------------------QUERIES------------------------------------------------------------------------------------------------------------------------

  @Query()
  async posts(@Context() context): Promise<Post[]>{
    const postList = await getMongoManager().find(PostEntity, {})
    return postList
  }

  @Query()
  async getOnePost(@Context() Context, @Args('_id') _id): Promise<Post> {
    try {
      const savedResult = await getMongoManager().findOne(PostEntity, _id)
      return savedResult
    } catch (error) {
      return null
    }
  }


//-----------------------------------------------------------------------------------MUTATIONS------------------------------------------------------------------------------------------------------------------------

@Mutation()
async likeAPost(@Context() context, @Args('postID') postID):Promise<Boolean>{
  try {

    const {user} = context
    const post = await getMongoManager().findOne(PostEntity, {_id: new ObjectID(postID)})
    let likes = post.likes || []

    if(likes.indexOf(user._id) !== -1){
      likes = [...likes.filter(v => v !== user._id)]
    } else {
      likes = [...likes, user._id]
    }

    const result = await getMongoManager().findOneAndUpdate(PostEntity, {
      _id: new ObjectID(postID)
    },
    {
      $set: {
        likes: likes
      }
    })

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

@Mutation()
  async addPost(@Context() Context, @Args('post') post): Promise<Boolean> {
    try {
      const {user} = Context
      const { content, image } = post
      const newPost = new PostEntity({
        who: user._id,
        image,
        content,
        time: Date.now()
      })
      const savedResult = await getMongoManager().save(PostEntity, newPost)
      return true
    } catch (error) {
      return null
    }
  }

  @Mutation()
  async deletePost(@Context() Context, @Args('postID') id): Promise<Boolean>{
    try{
      const res = await Promise.all([
        this.commentService.deleteCommentOnePost(id),
         getMongoManager().findOneAndDelete(PostEntity, { 
          _id: new ObjectID(id)
        })
      ])

      return (res[1].value) ?  true : false
    } catch(err){
      console.log(err)
      return false
    }
  }

  @Mutation()
  async updatePost(@Context() Context, @Args('post') post): Promise<Boolean>{
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
      return res.value ?  true : false
    } catch (error) {
      return false
    }
  }
}

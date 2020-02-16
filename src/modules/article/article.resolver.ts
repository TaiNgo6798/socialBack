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
import { ArticleEntity } from '../../entities/article.entity'
import { Article } from '../../graphql.schema'
import { ObjectID } from 'mongodb'

@Resolver()
@UseGuards(GqlAuthGuard)
export class PostResolver {

  //-----------------------------------------------------------------------------------QUERIES------------------------------------------------------------------------------------------------------------------------

  @Query()
  async articles(@Context() context): Promise<Article[]>{
    const articleList = await getMongoManager().find(ArticleEntity, {})
    return articleList
  }

  @Query()
  async getArticle(@Context() Context, @Args('articleID') id): Promise<any> {
    const savedResult = await getMongoManager().findOne(ArticleEntity, id)
    return savedResult
  }

  @Query()
  async search(@Context() Context, @Args('searchText') searchText): Promise<any> {
    return searchText
  }


//-----------------------------------------------------------------------------------MUTATIONS------------------------------------------------------------------------------------------------------------------------
  @Mutation()
  async addArticle(@Context() Context, @Args('article') article) {
    const { content, time } = article
    const newPost = new ArticleEntity({content, time})
    const savedResult = await getMongoManager().save(ArticleEntity, newPost)
    return savedResult
  }

  @Mutation()
  async deleteArticle(@Context() Context, @Args('articleID') id): Promise<any>{
    const res = await getMongoManager().findOneAndDelete(ArticleEntity, { 
      _id: new ObjectID(id)
    })
    return res.value ?  true : false
  }

  @Mutation()
  async updateArticle(@Context() Context, @Args('article') article): Promise<any>{
    const { _id, content, time } = article
    const res = await getMongoManager().findOneAndUpdate(ArticleEntity, {
      _id: new ObjectID(_id)
    },
    {
      $set: {
        content,
        time
      }
    })
    return res.value ?  true : false
  }

}

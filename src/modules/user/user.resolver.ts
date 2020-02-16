import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import * as jwt from 'jsonwebtoken'
import { getMongoManager } from 'typeorm'
import { UserEntity } from 'src/entities/user.entity'
import { User } from 'src/graphql.schema'

@Resolver('User')
export class UserResolver {

  //-----------------------------------------------------------------------------------QUERIES------------------------------------------------------------------------------------------------------------------------
  @Query()
  async login(@Args('loginInput') loginInput): Promise<any> {
    const { username, password } = loginInput
    const user = await getMongoManager().findOne(UserEntity, {
      username,
      password
    })
    try {
      const token = jwt.sign({ data: user }, 'taingo6798', {
        expiresIn: '24h'
      })
      return {
        status: 'success',
        message: 'Dang nhap thanh cong !',
        token
      }
    }
    catch (err) {

      return {
        status: 'failed',
        message: 'Dang nhap that bai !',
        token: ''
      }
    }
  }

  @Query()
  async users(): Promise<User[]> {
    return getMongoManager().find(UserEntity, {})
  }

  //-----------------------------------------------------------------------------------MUTATIONS------------------------------------------------------------------------------------------------------------------------
  @Mutation()
  async createUser(@Args('user') user): Promise<any> {
    try {
      const newUser = new UserEntity(user)
      const savedRes = await getMongoManager().save(UserEntity, newUser)
      return true
    }
    catch{
      return false
    }
  }

}

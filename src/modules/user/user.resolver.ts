import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { getMongoManager } from 'typeorm'
import { UserEntity } from 'src/entities/user.entity'
import { User, UserInfo } from 'src/graphql.schema'



const saltRounds = 10

@Resolver('User')
export class UserResolver {

  //-----------------------------------------------------------------------------------QUERIES------------------------------------------------------------------------------------------------------------------------
  
  @Query()
  async users(@Context() context): Promise<User[]> {
    return getMongoManager().find(UserEntity, {})
  }

  @Query()
  async getUserByID(@Args('_id') _id): Promise<UserInfo> {
    try {
      const res = await getMongoManager().findOne(UserEntity, _id)
      return res
    } catch (error) {
      return null
    }

  }

  //-----------------------------------------------------------------------------------MUTATIONS------------------------------------------------------------------------------------------------------------------------
  @Mutation()
  async login(@Args('loginInput') loginInput): Promise<any> {
    const { email, password } = loginInput
    const user = await getMongoManager().findOne(UserEntity, {
      email
    })
    try {
      if (bcrypt.compareSync(password, user.password)) {
        const { _id, firstName, lastName, avatar } = user
        const token = jwt.sign({
          _id,
          email,
          firstName,
          lastName,
          avatar
        }, 'taingo6798')
        return {
          status: 2,
          message: 'Dang nhap thanh cong  !',
          token
        }
      } else return {
        status: 1,
        message: 'Sai mat khau !',
      }
    }
    catch (err) {

      return {
        status: 0,
        message: 'Dang nhap that bai !',
      }
    }
  }
  
  @Mutation()
  async createUser(@Args('user') user): Promise<any> {

    try {
      const { email, password, firstName, lastName } = user

      const newUser = new UserEntity({
        email,
        password: bcrypt.hashSync(password, saltRounds),
        firstName,
        lastName
      })
      const duplicateUser = await getMongoManager().findOne(UserEntity, {
        email
      })
      if(!duplicateUser) {
        const savedRes = await getMongoManager().save(UserEntity, newUser)
        return true
      }
      return false
    }
    catch (err){
      return false
    }
  }

}

import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { getMongoManager } from 'typeorm'
import { UserEntity } from 'src/entities/user.entity'
import { User } from 'src/graphql.schema'
import { GqlAuthGuard } from 'src/common/guard/auth.guard'
import { UseGuards } from '@nestjs/common'


const saltRounds = 10

@Resolver('User')
export class UserResolver {

  //-----------------------------------------------------------------------------------QUERIES------------------------------------------------------------------------------------------------------------------------
  
  @Query()
  async users(@Context() context): Promise<User[]> {
    return getMongoManager().find(UserEntity, {})
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
        const { _id, firstName, lastName } = user
        const token = jwt.sign({
          _id,
          firstName,
          lastName
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

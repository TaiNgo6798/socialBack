import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from './modules/user/user.module'
import { join } from 'path'
import * as jwt from 'jsonwebtoken'
import { PostModule } from './modules/post/post.module'
import { CommentModule } from './modules/comment/comment.module'
import { FileModule } from './modules/file/file.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      database: 'social_app',
      url: `mongodb+srv://taingo:taingo6798@cluster0-tjufa.mongodb.net/test?retryWrites=true&w=majority`,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req, connection }) => {
        if (connection) {
          return {
            req: connection.context // tra data ve cho filter trong subscription
          }
        }
        return ({ req })
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        onConnect: (params, ws) => {
          try {
            const token = params['Authorization'].split(' ')[1]
            const decodedObj = jwt.verify(token, 'taingo6798')

            // return data den context trong filter o resolver
            return decodedObj
          } catch(err) {
            console.log(err)
            return false
          }
        }
      }
    }),
    UserModule, 
    PostModule,
    CommentModule,
    FileModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }

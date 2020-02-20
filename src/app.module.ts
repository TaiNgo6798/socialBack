import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from './modules/user/user.module'
import { join } from 'path'
import { ArticleModule } from './modules/article/article.module'
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      database: 'social_app',
      url: `mongodb+srv://taingo:taingo6798@cluster0-tjufa.mongodb.net/test?retryWrites=true&w=majority`,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req })
    }), 
    UserModule, 
    ArticleModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }

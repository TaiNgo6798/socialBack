import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UserService } from '../../modules/user/user.service'
import * as jwt from 'jsonwebtoken'
@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) { }

  async canActivate(
    context: ExecutionContext,
  ) {
    try {
      const gqlCtx = GqlExecutionContext.create(context)
      const { authorization } = gqlCtx.getContext().req.headers
      const decodedObj = jwt.verify(authorization.split(' ')[1], 'taingo6798')

      gqlCtx.getContext().user = decodedObj

      return true
    } catch (err) {
      return false
    }
  }
}

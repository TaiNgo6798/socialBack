import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UserService } from '../../modules/user/user.service'

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) { }

  async canActivate(
    context: ExecutionContext,
  ) {
    try {
      const gqlCtx = GqlExecutionContext.create(context)
      const { authorization } = gqlCtx.getContext().req.headers

      const token = authorization.split(' ')[1]
      const user =   await this.userService.decodeToken(token)
      if (user) {
        gqlCtx.getContext().user = user
      } else {
        return false
      }

    } catch (err) {
      console.log(err)
      return false
    }
    return true
  }
}

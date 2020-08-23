import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AuthzGuard extends AuthGuard('authz') {
  constructor(private reflector: Reflector) {
    super()
  }

  getRequest(context: ExecutionContext): unknown {
    const graphqlContext = GqlExecutionContext.create(context)
    const req = graphqlContext.getContext().req

    const isScoped = this.reflector.get<boolean>('scoped', context.getHandler())
    if (isScoped) req.scope = context.getHandler().name

    const resourceArgKey = this.reflector.get<string>('resourceId', context.getHandler())
    if (resourceArgKey) req.resource = graphqlContext.getArgs()[resourceArgKey]

    return req
  }
}
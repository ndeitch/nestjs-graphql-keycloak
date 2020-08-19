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
    const req = GqlExecutionContext.create(context).getContext().req

    const isScoped = this.reflector.get<boolean>('scoped', context.getHandler())

    if (isScoped) req.scope = context.getHandler().name

    return req
  }
}
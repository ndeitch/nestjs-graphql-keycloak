import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { AuthzGuard } from "./authz.guard";

@Resolver(() => String)
export class AuthzResolver {
  @UseGuards(AuthzGuard)
  @Query(() => String)
  authn(): string {
    return 'Hello authorized World'
  }
}
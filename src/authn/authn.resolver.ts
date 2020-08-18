import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { AuthnGuard } from "./authn.guard";

@Resolver(() => String)
export class AuthnResolver {
  @UseGuards(AuthnGuard)
  @Query(() => String)
  authn(): string {
    return 'Hello authenticated World'
  }
}
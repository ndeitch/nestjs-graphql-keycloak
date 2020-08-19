import { Query, Resolver } from "@nestjs/graphql";
import { Scoped } from "./scoped.decorator";

@Resolver(() => String)
export class AuthzResolver {
  @Scoped()
  @Query(() => String)
  getContentById(): string {
    return 'Hello from getContentById'
  }

  @Scoped()
  @Query(() => String)
  listContents(): string {
    return 'Hello from listContents'
  }
}
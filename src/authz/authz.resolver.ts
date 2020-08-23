import { Args, Query, Resolver } from "@nestjs/graphql";
import { Scoped } from "./scoped.decorator";

@Resolver(() => String)
export class AuthzResolver {
  @Scoped()
  @Query(() => String)
  createContent(): string {
    return 'Hello from createContent'
  }

  @Scoped({ resourceId: 'id' })
  @Query(() => String)
  deleteContent(@Args('id', { type: () => String }) id: string): string {
    return `You've scope=${id}:deleteContent`
  }

  @Scoped({ resourceId: 'id' })
  @Query(() => String)
  getContent(@Args('id', { type: () => String }) id: string): string {
    return `You've scope=${id}:getContent`
  }

  @Scoped({ resourceId: 'id' })
  @Query(() => String)
  updateContentTitle(@Args('id', { type: () => String }) id: string): string {
    return `You've scope=${id}:updateContentTitle`
  }
}
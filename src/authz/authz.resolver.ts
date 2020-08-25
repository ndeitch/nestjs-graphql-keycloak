import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Scoped } from "./scoped.decorator";

@Resolver(() => String)
export class AuthzResolver {
  @Scoped({ resourceId: 'folder' })
  @Mutation(() => Boolean)
  createContent(@Args('folder', { type: () => String }) folder: string): boolean {
    console.log(`You've scope=${folder}:createContent`)
    return true
  }

  @Scoped()
  @Query(() => String)
  deleteContent(@Args('id', { type: () => String }) id: string): string {
    return `You've scope=${id}:deleteContent`
  }

  @Scoped()
  @Query(() => String)
  getContent(@Args('id', { type: () => String }) id: string): string {
    return `You've scope=${id}:getContent`
  }

  @Scoped()
  @Query(() => String)
  updateContentTitle(@Args('id', { type: () => String }) id: string): string {
    return `You've scope=${id}:updateContentTitle`
  }
}
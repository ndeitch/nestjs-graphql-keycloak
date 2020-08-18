import { Query, Resolver } from "@nestjs/graphql";

@Resolver(() => String)
export class PublicResolver {
  
  @Query(() => String)
  public(): string {
    return 'Hello public world'
  }
}
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { AuthnGuard } from './authn/authn.guard';
import { AuthnResolver } from './authn/authn.resolver';
import { AuthnStrategy } from './authn/authn.strategy';
import { PublicResolver } from './public/public.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    PassportModule
  ],
  controllers: [],
  providers: [AuthnGuard, AuthnStrategy, AuthnResolver, PublicResolver],
})
export class AppModule {}

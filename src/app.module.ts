import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { AuthnGuard } from './authn/authn.guard';
import { AuthnResolver } from './authn/authn.resolver';
import { AuthnStrategy } from './authn/authn.strategy';
import { AuthzGuard } from './authz/authz.guard';
import { AuthzResolver } from './authz/authz.resolver';
import { PublicResolver } from './public/public.resolver';
import { AuthzStrategy } from './authz/authz.strategy';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    PassportModule
  ],
  controllers: [],
  providers: [AuthnGuard, AuthzGuard, AuthnStrategy, AuthzStrategy, AuthnResolver, AuthzResolver, PublicResolver],
})
export class AppModule {}

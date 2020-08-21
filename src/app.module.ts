import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthnGuard } from './authn/authn.guard';
import { AuthnResolver } from './authn/authn.resolver';
import { AuthnStrategy } from './authn/authn.strategy';
import { AuthzGuard } from './authz/authz.guard';
import { AuthzResolver } from './authz/authz.resolver';
import { AuthzStrategy } from './authz/authz.strategy';
import { Oauth2Controller } from './oauth2/oauth2.controller';
import { Oauth2Strategy } from './oauth2/oauth2.strategy';
import { PublicResolver } from './public/public.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    PassportModule
  ],
  controllers: [Oauth2Controller],
  providers: [AuthnGuard, AuthzGuard, AuthnStrategy, AuthzStrategy, AuthnResolver, AuthzResolver, PublicResolver, Oauth2Strategy],
})
export class AppModule {}

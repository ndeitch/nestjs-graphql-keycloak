import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2";

@Injectable()
export class Oauth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
  constructor() {
    super({
      authorizationURL: 'http://localhost:8080/auth/realms/skore/protocol/openid-connect/auth',
      tokenURL: 'http://localhost:8080/auth/realms/skore/protocol/openid-connect/token',
      clientID: 'ilt',
      clientSecret: '2c1860ba-7bd9-439c-8aff-94137e8de85e',
      callbackURL: 'http://localhost:3000/oauth2/callback',
      skipUserProfile: true,
      passReqToCallback: true,
    })
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  validate(req: any, accessToken: string, refreshToken: string, params: any): boolean {
    console.log(params);
    req.accessToken = accessToken
    req.refreshToken = refreshToken
    return true
  }
}
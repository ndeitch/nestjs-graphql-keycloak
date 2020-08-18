import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as Keycloak from 'keycloak-connect';
import { Strategy } from "passport-http-bearer";

@Injectable()
export class AuthzStrategy extends PassportStrategy(Strategy, 'authz') {
  private readonly grantManager: Keycloak.GrantManager

  constructor() {
    super()
    this.grantManager = new Keycloak({}, {
      resource: 'content',
      realm: 'skore',
      'auth-server-url': 'http://localhost:8080/auth',
      secret: 'e92e1c8c-53a0-49d7-9ea0-f8a5f4dde141'
    } as any).grantManager
  }

  async validate(token: string): Promise<boolean> {
    try {
      const result = await this.grantManager.validateAccessToken(token)
      
      return typeof result === 'string' ? true : false
    } catch (error) {
      Logger.error('Failed to validate token', error, AuthzStrategy.name)
      return false
    }
  }
}
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ForbiddenError } from "apollo-server-express";
import { Request } from "express";
import * as Keycloak from 'keycloak-connect';
import { Strategy } from "passport-http-bearer";

@Injectable()
export class AuthzStrategy extends PassportStrategy(Strategy, 'authz') {
  private readonly keycloak: Keycloak.Keycloak
  private readonly resource: string

  constructor() {
    super({ passReqToCallback: true })
    this.keycloak = new Keycloak({}, {
      resource: 'content',
      realm: 'skore',
      'auth-server-url': 'http://localhost:8080/auth',
      secret: 'e92e1c8c-53a0-49d7-9ea0-f8a5f4dde141'
    } as any)
    this.resource = 'content'
  }

  async validate(req: Request): Promise<boolean> {
    const scope = (req as any).scope

    if (!scope) return true
    
    const permissionExpected = `${this.resource}:${scope}`
    
    const enforcerFn = this.keycloak.enforcer(permissionExpected, { response_mode: 'token' })
    
    try {
      await new Promise((resolve, reject) => {
        this.keycloak.accessDenied = () => reject('Access denied')
        enforcerFn(req, null, resolve)
      })
      return true
    } catch (error) {
      throw new ForbiddenError(`Missing required '${permissionExpected}' scope`)
    }
  }
}
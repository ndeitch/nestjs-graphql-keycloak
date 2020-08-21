import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('oauth2')
export class Oauth2Controller {

  @UseGuards(AuthGuard('oauth2'))
  @Get('callback')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  findAll(@Req() req: any): unknown {
    return { accessToken: req.accessToken, refreshToken: req.refreshToken }
  }
}
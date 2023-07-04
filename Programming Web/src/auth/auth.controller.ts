import { Get, Controller, Req, Res, UseGuards } from "@nestjs/common";
import { ApiExcludeController, ApiOperation } from "@nestjs/swagger";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { Auth0Guard } from "./auth0.guard";
import { AuthStatusDto } from "./dto/auth-status.dto";

@Controller()
@ApiExcludeController()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    @Get()
    async startPage(@Req() request: Request, @Res() response: Response) {
        const user = request.oidc.user;
        if (user && !await this.authService.userExists(user.nickname)) {
            await this.authService.create(user.nickname, user.email);
        }

        response.redirect('/projects-page');
    }

    @ApiOperation({ summary: 'Get status of current user auth' })
    @Get('is-authorized')
    isAuthorized(@Req() req: Request) : AuthStatusDto {
        return { isAuthorized: req.oidc.isAuthenticated() }
    }

    @UseGuards(Auth0Guard)
    @Get('current-auth')
    async getCurrentAuth(@Req() request: Request) {
        const user = await this.authService.getCurrentAuth(request.oidc.user.nickname);
        return { id: user.id, nickname: user.nickname}
    }
}
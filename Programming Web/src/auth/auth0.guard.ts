import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class Auth0Guard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return context.switchToHttp().getRequest().oidc.isAuthenticated();
    }
}
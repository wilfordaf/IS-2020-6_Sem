import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { User } from "../user/entities/user.entity";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { Auth0Guard } from "./auth0.guard";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService, Auth0Guard],
    exports: [Auth0Guard]
})

export class AuthModule {}
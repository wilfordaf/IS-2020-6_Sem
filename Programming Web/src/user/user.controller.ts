import {
  ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AutoMapper } from "nestjsx-automapper";
import { User } from "./entities/user.entity";
import { UserDto } from "./dto/user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Auth0Guard } from "../auth/auth0.guard";
import { Request } from "express";

@UseGuards(Auth0Guard)
@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(
      private readonly userService: UserService,
      private readonly mapper: AutoMapper) {
    mapper.createMap(User, UserDto);
  }

  @ApiOperation({summary: 'Get user by id'})
  @ApiBearerAuth()
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: UserDto })
  @Get(':id')
  async getById(@Param('id') id: number) {
    const user = await this.userService.getById(id);
    return this.mapper.map(user, UserDto);
  }

  @ApiOperation({summary: 'Get all users'})
  @ApiBearerAuth()
  @ApiForbiddenResponse()
  @ApiOkResponse({ type: UserDto, isArray: true })
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return this.mapper.mapArray(users, UserDto);
  }

  @ApiOperation({summary: 'Update user'})
  @ApiOkResponse({ type: UserDto })
  @ApiBearerAuth()
  @ApiForbiddenResponse()
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @Req() request: Request) {
    const user = await this.userService.update(request.oidc.user.nickname, updateUserDto);
    return this.mapper.map(user, UserDto);
  }

  @ApiOperation({summary: 'Delete user by id'})
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.userService.delete(id);
  }
}
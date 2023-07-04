import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { AutoMapper, mapFrom } from "nestjsx-automapper";
import { Project } from "./entities/project.entity";
import { ProjectDto } from "./dto/project.dto";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ProjectTagDto } from "./dto/project-tag.dto";
import { UserDto } from "../user/dto/user.dto";
import { User } from "../user/entities/user.entity";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Auth0Guard } from "../auth/auth0.guard";
import { Request } from "express";

@ApiTags('project')
@Controller('projects')
export class ProjectController {
  constructor(
      private readonly projectService: ProjectService,
      private readonly mapper: AutoMapper) {
    mapper.createMap(User, UserDto)
    mapper.createMap(Project, ProjectDto)
        .forMember(dest => dest.tags, mapFrom(src => src.tags?.map(t => mapper.map(t, ProjectTagDto))))
        .forMember(dest => dest.user, mapFrom(src => mapper.map(src.user, UserDto)));
  }

  @ApiOperation({summary: 'Get project by id'})
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: ProjectDto })
  @Get(':id')
  async getById(@Param('id') id: number) {
    const project = await this.projectService.getById(id);
    return this.mapper.map(project, ProjectDto);
  }

  @ApiOperation({summary: 'Get all projects'})
  @ApiOkResponse({ type: ProjectDto, isArray: true })
  @Get()
  async findAll() {
    const projectTags = await this.projectService.findAll();
    return this.mapper.mapArray(projectTags, ProjectDto);
  }

  @UseGuards(Auth0Guard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Create new project'})
  @ApiOkResponse({ type: ProjectDto })
  @ApiNotFoundResponse()
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto, @Req() request: Request) {
    const project = await this.projectService.create(request.oidc.user.nickname, createProjectDto);
    return this.mapper.map(project, ProjectDto);
  }

  @UseGuards(Auth0Guard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Update project'})
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: ProjectDto })
  @Patch()
  async update(@Body() updateProjectDto : UpdateProjectDto, @Req() request: Request) {
    const project = await this.projectService.update(request.oidc.user.nickname, updateProjectDto);
    return this.mapper.map(project, ProjectDto);
  }

  @UseGuards(Auth0Guard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Delete project by id'})
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() request: Request) {
    await this.projectService.delete(request.oidc.user.nickname, id);
  }
}
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ProjectTagService } from "./project-tag.service";
import {CreateTagDto} from "./dto/create-tag.dto";
import {AutoMapper} from "nestjsx-automapper";
import {ProjectTag} from "./entities/project-tag.entity";
import {ProjectTagDto} from "./dto/project-tag.dto";
import { Auth0Guard } from "../auth/auth0.guard";

@ApiTags('project')
@Controller('projectTags')
export class ProjectTagController {
  constructor(
      private readonly projectTagService: ProjectTagService,
      private readonly mapper: AutoMapper) {
    mapper.createMap(ProjectTag, ProjectTagDto);
  }

  @ApiOperation({summary: 'Get project tag by id'})
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: ProjectTagDto })
  @Get(':id')
  async getById(@Param('id') id: number) {
    const projectTag = await this.projectTagService.getById(id);
    return this.mapper.map(projectTag, ProjectTagDto);
  }

  @ApiOperation({summary: 'Get all project tags'})
  @ApiOkResponse({ type: ProjectTagDto, isArray: true })
  @Get()
  async findAll() {
    const projectTags = await this.projectTagService.findAll();
    return this.mapper.mapArray(projectTags, ProjectTagDto);
  }

  @UseGuards(Auth0Guard)
  @ApiOperation({summary: 'Create tag by name'})
  @ApiOkResponse({ type: ProjectTagDto })
  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    const projectTag = await this.projectTagService.create(createTagDto);
    return this.mapper.map(projectTag, ProjectTagDto);
  }

  @UseGuards(Auth0Guard)
  @ApiOperation({summary: 'Delete tag by id'})
  @ApiNotFoundResponse()
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.projectTagService.delete(id);
  }
}
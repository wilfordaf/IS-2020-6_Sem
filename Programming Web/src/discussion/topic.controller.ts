import {
  ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { TopicService } from "./topic.service";
import { AutoMapper, mapFrom } from "nestjsx-automapper";
import { Topic } from "./entities/topic.entity";
import { TopicDto } from "./dto/topic.dto";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { User } from "../user/entities/user.entity";
import { UserDto } from "../user/dto/user.dto";
import { CommentDto } from "./dto/comment.dto";
import { Project } from "../project/entities/project.entity";
import { ProjectLinkDto } from "../project/dto/project-link.dto";
import { Auth0Guard } from "../auth/auth0.guard";
import { Request } from "express";

@ApiTags('discussion')
@Controller('topics')
export class TopicController {
  constructor(
      private readonly topicService: TopicService,
      private readonly mapper: AutoMapper) {
    mapper.createMap(Project, ProjectLinkDto)
    mapper.createMap(User, UserDto)
    mapper.createMap(Topic, TopicDto)
        .forMember(dest => dest.comments, mapFrom(src => src.comments?.map(c => mapper.map(c, CommentDto))))
        .forMember(dest => dest.user, mapFrom(src => mapper.map(src.user, UserDto)))
        .forMember(dest => dest.project, mapFrom(src => mapper.map(src.project, ProjectLinkDto)))
  }

  @ApiOperation({summary: 'Get topic by id'})
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: TopicDto })
  @Get(':id')
  async getById(@Param('id') id: number) {
    const topic = await this.topicService.getById(id);
    return this.mapper.map(topic, TopicDto);
  }

  @ApiOperation({summary: 'Get all topics'})
  @Get()
  async findAll() {
    const topics = await this.topicService.findAll();
    return this.mapper.mapArray(topics, TopicDto);
  }

  @UseGuards(Auth0Guard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Create new topic'})
  @ApiOkResponse({ type: TopicDto })
  @ApiNotFoundResponse()
  @Post()
  async create(@Body() createTopicDto: CreateTopicDto, @Req() request: Request) {
    const topic = await this.topicService.create(request.oidc.user.nickname, createTopicDto);
    return this.mapper.map(topic, TopicDto);
  }

  @UseGuards(Auth0Guard)
  @ApiOperation({summary: 'Delete topic by id'})
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() request: Request) {
    await this.topicService.delete(request.oidc.user.nickname, id);
  }
}
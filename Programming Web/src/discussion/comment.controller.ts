import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { AutoMapper, mapFrom } from "nestjsx-automapper";
import { Comment } from "./entities/comment.entity";
import { CommentDto } from "./dto/comment.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UserDto } from "../user/dto/user.dto";
import { AssessmentDto } from "./dto/assessment.dto";
import { PaginationCommentDto } from "./dto/pagination-comment.dto";
import { PaginationDataDto } from "./dto/pagination-data.dto";
import { Auth0Guard } from "../auth/auth0.guard";
import { Request } from "express";

@UseGuards(Auth0Guard)
@ApiTags('discussion')
@Controller('comments')
export class CommentController {
  constructor(
      private readonly commentService: CommentService,
      private readonly mapper: AutoMapper) {
    mapper.createMap(Comment, CommentDto)
        .forMember(dest => dest.assessments, mapFrom(src => src.assessments?.map(a => mapper.map(a, AssessmentDto))))
        .forMember(dest => dest.user, mapFrom(src => mapper.map(src.user, UserDto)));
  }

  @ApiOperation({summary: 'Get comment by id'})
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: CommentDto })
  @Get(':id')
  async getById(@Param('id') id: number) {
    const comment = await this.commentService.getById(id);
    return this.mapper.map(comment, CommentDto);
  }

  @ApiOperation({summary: 'Get all comments'})
  @ApiOkResponse({ type: CommentDto, isArray: true })
  @Get()
  async findAll() {
    const comments = await this.commentService.findAll();
    return this.mapper.mapArray(comments, CommentDto);
  }

  @ApiOperation({summary: 'Get pagination for comments'})
  @ApiOkResponse({ type: PaginationCommentDto })
  @Get('topic/:topicId')
  async findByTopic(@Param('topicId') topicId: number,
                    @Query() paginationData: PaginationDataDto) {

    const [comments, total] = await this.commentService.findByTopicId(topicId, paginationData.page, paginationData.limit);
    const totalPages = Math.ceil(Number(total) / paginationData.limit);
    return {totalPages, comments};
  }

  @ApiOperation({summary: 'Create new comment'})
  @ApiOkResponse({ type: CommentDto })
  @ApiNotFoundResponse()
  @ApiBearerAuth()
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Req() request: Request) {
    const comment = await this.commentService.create(request.oidc.user.nickname, createCommentDto);
    return this.mapper.map(comment, CommentDto);
  }

  @ApiOperation({summary: 'Delete comment by id'})
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  @ApiNotFoundResponse()
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() request: Request) {
    await this.commentService.delete(request.oidc.user.nickname, id);
  }
}
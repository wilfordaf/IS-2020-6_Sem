import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AssessmentService } from "./assessment.service";
import { AutoMapper, mapFrom } from "nestjsx-automapper";
import { Assessment } from "./entities/assessment.entity";
import { AssessmentDto } from "./dto/assessment.dto";
import { CreateAssessmentDto } from "./dto/create-assessment.dto";
import { UserDto } from "../user/dto/user.dto";
import { Auth0Guard } from "../auth/auth0.guard";
import { Request } from "express";

@UseGuards(Auth0Guard)
@ApiTags('discussion')
@Controller('assessments')
export class AssessmentController {
  constructor(
      private readonly assessmentService: AssessmentService,
      private readonly mapper: AutoMapper) {
    mapper.createMap(Assessment, AssessmentDto)
        .forMember(dest => dest.user, mapFrom(src => mapper.map(src.user, UserDto)));
  }

  @ApiOperation({summary: 'Get assessment by id'})
  @ApiNotFoundResponse()
  @ApiBearerAuth()
  @ApiOkResponse({ type: AssessmentDto })
  @Get(':id')
  async getById(@Param('id') id: number) {
    const assessment = await this.assessmentService.getById(id);
    return this.mapper.map(assessment, AssessmentDto);
  }

  @ApiOperation({summary: 'Get all assessments'})
  @ApiBearerAuth()
  @ApiOkResponse({ type: AssessmentDto, isArray: true })
  @Get()
  async findAll() {
    const assessments = await this.assessmentService.findAll();
    return this.mapper.mapArray(assessments, AssessmentDto);
  }

  @ApiOperation({summary: 'Create new assessment'})
  @ApiCreatedResponse({ type: AssessmentDto })
  @ApiNotFoundResponse()
  @ApiBearerAuth()
  @Post()
  async create(@Body() createAssessmentDto: CreateAssessmentDto, @Req() request: Request) {
    const assessment = await this.assessmentService.create(request.oidc.user.nickname, createAssessmentDto);
    return this.mapper.map(assessment, AssessmentDto);
  }

  @ApiOperation({summary: 'Delete assessment by id'})
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() request: Request) {
    await this.assessmentService.delete(request.oidc.user.nickname, id);
  }
}
import { ProjectTagController } from "./project-tag.controller";
import { ProjectTagService } from "./project-tag.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ProjectTag } from "./entities/project-tag.entity";
import { AutoMapper } from 'nestjsx-automapper';
import { ProjectController } from "./project.controller";
import { Project } from "./entities/project.entity";
import { ProjectService } from "./project.service";
import { User } from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectTag, Project, User])],
  controllers: [ProjectTagController, ProjectController],
  providers: [ProjectTagService, ProjectService, AutoMapper]
})

export class ProjectModule {}
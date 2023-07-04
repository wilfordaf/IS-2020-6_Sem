import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { AutoMapper } from 'nestjsx-automapper';
import { Assessment } from "./entities/assessment.entity";
import { Comment } from "./entities/comment.entity";
import { Topic } from "./entities/topic.entity";
import { TopicController } from "./topic.controller";
import { TopicService } from "./topic.service";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { AssessmentController } from "./assessment.controller";
import { AssessmentService } from "./assessment.service";
import { User } from "../user/entities/user.entity";
import { Project } from "../project/entities/project.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Assessment, Comment, Topic, User, Project])],
  controllers: [TopicController, CommentController, AssessmentController],
  providers: [TopicService, CommentService, AssessmentService, AutoMapper]
})

export class DiscussionModule {}
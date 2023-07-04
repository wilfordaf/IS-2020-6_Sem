import {AutoMap} from "nestjsx-automapper";
import {ApiProperty} from "@nestjs/swagger";
import { ProjectTagDto } from "./project-tag.dto";
import { TopicDto } from "../../discussion/dto/topic.dto";
import { User } from "../../user/entities/user.entity";

export class ProjectDto {
    @AutoMap()
    @ApiProperty()
    id: number;

    @AutoMap()
    @ApiProperty()
    name: string;

    @AutoMap()
    @ApiProperty()
    description: string;

    @AutoMap()
    @ApiProperty()
    pictureData: string | null;

    @AutoMap()
    @ApiProperty()
    repositoryLink: string;

    @AutoMap()
    @ApiProperty({ isArray: true, type: () =>  TopicDto })
    topics: TopicDto[];

    @AutoMap()
    @ApiProperty({ isArray: true, type: () => ProjectTagDto })
    tags: ProjectTagDto[];

    @AutoMap()
    @ApiProperty()
    user: User;
}
import { AutoMap } from "nestjsx-automapper";
import { ApiProperty } from "@nestjs/swagger";
import { CommentDto } from "./comment.dto";
import { UserDto } from "../../user/dto/user.dto";
import { ProjectLinkDto } from "../../project/dto/project-link.dto";

export class TopicDto {
    @AutoMap()
    @ApiProperty()
    id: number;

    @AutoMap()
    @ApiProperty()
    name: string;

    @AutoMap()
    @ApiProperty({ isArray: true, type: () => CommentDto })
    comments: CommentDto[];

    @AutoMap()
    @ApiProperty()
    user: UserDto;

    @AutoMap()
    @ApiProperty()
    project: ProjectLinkDto;

    @AutoMap()
    @ApiProperty()
    date: Date;
}

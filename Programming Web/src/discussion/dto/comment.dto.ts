import {AutoMap} from "nestjsx-automapper";
import {ApiProperty} from "@nestjs/swagger";
import { AssessmentDto } from "./assessment.dto";
import { UserDto } from "../../user/dto/user.dto";

export class CommentDto {
    @AutoMap()
    @ApiProperty()
    id: number;

    @AutoMap()
    @ApiProperty()
    text: string;

    @AutoMap()
    @ApiProperty({ isArray: true, type: () => AssessmentDto })
    assessments: AssessmentDto[];

    @AutoMap()
    @ApiProperty()
    date: Date;

    @AutoMap()
    @ApiProperty()
    user: UserDto;
}
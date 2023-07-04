import {AutoMap} from "nestjsx-automapper";
import {ApiProperty} from "@nestjs/swagger";

export class ProjectLinkDto {
    @AutoMap()
    @ApiProperty()
    name: string;

    @AutoMap()
    @ApiProperty()
    repositoryLink: string;
}